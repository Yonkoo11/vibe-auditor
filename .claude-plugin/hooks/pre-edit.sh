#!/usr/bin/env bash
# pre-edit.sh - Block writes/edits that contain hardcoded secrets
# Runs as a Claude Code PreToolUse hook on Write|Edit events
# Exit 0 = allow, Exit 1 = block

FILEPATH="$1"

# Nothing to check
[ -z "$FILEPATH" ] && exit 0

# Skip .env files (that's where secrets belong)
case "$FILEPATH" in
    *.env|*.env.local|*.env.development|*.env.production|*.env.staging)
        exit 0
        ;;
    *.env.example|*.env.sample|*.env.template)
        exit 0
        ;;
esac

# Skip if file doesn't exist yet (new file, content not written)
[ ! -f "$FILEPATH" ] && exit 0

# Patterns that indicate hardcoded secrets
# We use -P (perl regex) for lookbehind/ahead where needed
# Fall back to -E (extended regex) for broad compat

MATCHES=$(grep -nE \
    -e 'AKIA[0-9A-Z]{16}' \
    -e 'sk_live_[a-zA-Z0-9]+' \
    -e 'sk_test_[a-zA-Z0-9]+' \
    -e 'BEGIN RSA PRIVATE KEY' \
    -e 'BEGIN EC PRIVATE KEY' \
    -e 'BEGIN OPENSSH PRIVATE KEY' \
    -e 'BEGIN PGP PRIVATE KEY' \
    -e 'mongodb://[^:]+:[^@]+@' \
    -e 'postgres://[^:]+:[^@]+@' \
    -e 'postgresql://[^:]+:[^@]+@' \
    -e 'mysql://[^:]+:[^@]+@' \
    "$FILEPATH" 2>/dev/null)

# Filter out env var references (process.env.X, os.environ, ${VAR})
if [ -n "$MATCHES" ]; then
    FILTERED=$(echo "$MATCHES" | grep -vE 'process\.env\.|os\.environ|getenv\(|\$\{[A-Z_]+\}')
    if [ -n "$FILTERED" ]; then
        echo "BLOCKED: Potential hardcoded secrets detected in $FILEPATH"
        echo "$FILTERED" | head -5
        echo ""
        echo "Use environment variables instead (process.env.X, os.environ, etc.)"
        exit 1
    fi
fi

# Check for generic assignment patterns: password = "actual_value"
# But NOT password = process.env.X or password = "" or password = "CHANGE_ME"
GENERIC=$(grep -nEi \
    -e '(password|secret|api_key|apikey|api_secret|access_token|auth_token|private_key)[[:space:]]*[:=][[:space:]]*["\x27][^"\x27]{8,}["\x27]' \
    "$FILEPATH" 2>/dev/null)

if [ -n "$GENERIC" ]; then
    # Filter out safe patterns
    FILTERED=$(echo "$GENERIC" | grep -vE \
        -e 'process\.env\.' \
        -e 'os\.environ' \
        -e 'getenv\(' \
        -e '\$\{[A-Z_]+\}' \
        -e 'CHANGE_ME|REPLACE_ME|YOUR_.*_HERE|xxx|placeholder|example' \
        -e '\.env\.' \
        -e '#.*password' \
        -e '//.*password' \
        -e '/\*.*password')

    if [ -n "$FILTERED" ]; then
        echo "BLOCKED: Possible hardcoded credentials in $FILEPATH"
        echo "$FILTERED" | head -5
        echo ""
        echo "Use environment variables instead of hardcoding secrets."
        exit 1
    fi
fi

exit 0

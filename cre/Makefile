.PHONY: install generate-bindings privacy execution help

# --- Grouped Targets ---
# Runs the full privacy pipeline: Install dependencies and Simulate
privacy:
	@echo "--- [PRIVACY] Starting Generic x402 Enclave Pipeline ---"
	cd privacy/workflow && npm install
	cd privacy && cre workflow simulate workflow --target staging-settings --non-interactive --trigger-index 0 --http-payload test-payload.json

# Runs the full execution pipeline: Install, Bindings, and Simulate
execution:
	@echo "--- [EXECUTION] Starting On-Chain Fulfillment Pipeline ---"
	cd execution/workflow && npm install
	cd execution && cre generate-bindings evm -l typescript -p workflow
	@echo "Note: Simulation will attempt to fetch a real TX from Sepolia."
	cd execution && cre workflow simulate workflow --target staging-settings --non-interactive --trigger-index 0 --evm-tx-hash 0x0000000000000000000000000000000000000000000000000000000000000000 --evm-event-index 0

# --- Individual Utilities ---
install:
	@echo "Installing all dependencies..."
	cd privacy/workflow && npm install
	cd execution/workflow && npm install

generate-bindings:
	@echo "Regenerating native TypeScript EVM bindings..."
	cd execution && cre generate-bindings evm -l typescript -p workflow

help:
	@echo "CRE x402 Orchestrator Automation:"
	@echo "  make privacy    - Runs Privacy Workflow (TEE Enclave)"
	@echo "  make execution  - Runs Execution Workflow (EVM Writeback)"
	@echo "  make install    - Setup all environments"

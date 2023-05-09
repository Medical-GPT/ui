#!make
#----------------------------------------
# Settings
#----------------------------------------
.DEFAULT_GOAL := help
#--------------------------------------------------
# Targets
#--------------------------------------------------
install: ## Installs node dependencies
	@npm install
run: ## Runs the UI
	@ng serve --port 5000

test: ## Runs unit tests
	@ng test

.PHONY:install run help
clean: ## Cleans up temporary files
	@echo "==> Cleaning up node modules ..."
	@rm -r node_modules
	@echo "    [✓]"
	@echo ""
help: ## Shows available targets
	@fgrep -h "## " $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-13s\033[0m %s\n", $$1, $$2}'

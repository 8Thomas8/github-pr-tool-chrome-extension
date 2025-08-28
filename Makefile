# Name of the zip
EXT_NAME = github-pr-tool-chrome-extension
ZIP_FILE = $(EXT_NAME).zip

# Folders and files to include
FILES = manifest.json popup.html LICENSE
DIRS  = assets

.PHONY: all clean zip

all: zip

zip:
	@echo "Packaging $(ZIP_FILE)..."
	@rm -f $(ZIP_FILE)
	# Zip directories recursively
	@for dir in $(DIRS); do \
		zip -r $(ZIP_FILE) $$dir; \
	done
	# Add individual files
	@zip $(ZIP_FILE) $(FILES)
	@echo "Done: $(ZIP_FILE)"

clean:
	@rm -f $(ZIP_FILE)
	@echo "Cleaned."

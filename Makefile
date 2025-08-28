# Name of the zip
EXT_NAME = github-pr-tool-chrome-extension
ZIP_FILE = $(EXT_NAME).zip

# Folders and files to include
INCLUDE = manifest.json assets popup.html LICENSE

.PHONY: all clean zip

all: zip

zip:
	@echo "Packaging $(ZIP_FILE)..."
	@rm -f $(ZIP_FILE)
	@zip -r $(ZIP_FILE) $(INCLUDE)
	@echo "Done: $(ZIP_FILE)"

clean:
	@rm -f $(ZIP_FILE)
	@echo "Cleaned."

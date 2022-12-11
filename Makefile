install:
	npm ci
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
publish:
	npm publish --dry-run
link:
	sudo npm link
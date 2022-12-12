install:
	npm ci
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
publish:
	npm publish --dry-run
test:
	npx jest
link:
	sudo npm link
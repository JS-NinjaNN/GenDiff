install:
	npm ci
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
publish:
	npm publish --dry-run
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
link:
	sudo npm link
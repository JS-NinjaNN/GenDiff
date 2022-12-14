install:
	npm ci
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
publish:
	npm publish --dry-run
test-coverage:
	npm test -- --coverage
link:
	sudo npm link

# test:
# 	shifter --yui-module tmp/controllers/news.js --build-dir ./foo --no-lint

default:
	DEBUG=* node ./app.js
	# node ./app.js

clean:
	rm -rf tmp/ build/

link:
	npm link ../express-view
	npm link ../express-yui
	npm link ../locator
	npm link ../locator-handlebars
	npm link ../locator-yui

#  ~/fs/stage/ygit/react-portfolio/node_modules/react-tools/bin/jsx -w -x jsx react-views/ jsx/
jsx:
	~/fs/stage/ygit/react-portfolio/node_modules/react-tools/bin/jsx -w -x jsx react-views/ jsx/

# jshint --config ./node_modules/yui-lint/jshint.json ./lib/**/*.js *.js
lint:
	jshint --config ./jshint.json ./lib/**/*.js ./controllers/*.js ./routes/*.js *.js

deploy:
	git push heroku dev:master

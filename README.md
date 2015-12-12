# react-textcompleter

A customisable autocompleter for custom inputs.
It allows multiple data source and multi-words completion.
It allows classical text input or totally custom input (for example material-ui/lib/text-field )

See the examples below available in examples/

Simple | Customized | Multi
------------ | ------------- | -------------
![](https://raw.githubusercontent.com/jnoleau/react-textcompleter/master/readme/simple.png) | ![](https://raw.githubusercontent.com/jnoleau/react-textcompleter/master/readme/tweetlike.png) | ![](https://raw.githubusercontent.com/jnoleau/react-textcompleter/master/readme/demo.gif)

## Usage

Install it `npm install --save react-textcompleter`

```javascript
import {TextCompleter, TokenSource} from 'react-textcompleter';

const following = [/* data */];

<TextCompleter>
  <TokenSource token="#" data={['#javascript', '#java']} />
  <TokenSource token="@" data={following} />
</TextCompleter>
```

## Demo

Clone this repository, run `npm install` then `npm run dev` and visit [http://localhost:3000](http://localhost:3000)

## API (not complete, see examples/ folder)

#### TextCompleter

This is the owner of TokenSource(s) containing the textarea.

```javascript
<TextCompleter
 // optionals
 wordSeparator=" "
 input={<textarea />} >
   { /* .. sources ..*/ }
</TextCompleter>
```

* wordSeparator:string (default is ' ') the words separator

#### TokenSource

You give a token (a string) & data, when the user writes this token, the autocompletion uses the corresponding TokenSource is triggered.

```javascript
<TokenSource
  token="@"
  data={ [] }

  // optionals
  itemNumber={ 4 }
  itemRender={ (item, query) => item }
  itemValue={ (item) => item }
  itemKey={ (item) => item }
  stylemap={ {
    li: '',
    ul: '',
    pending: 'pending',
    active: 'active'
  } } />
```

* **token**`:string` the string the user has to write to trigger the completer. If you have multiple sources, each token has to be unique.

* **data** The data used for suggestions

----- `:array<string>  ['#javascript', '#cofee', .. ]`

This is the simplest form, give an array of strings, the default matcher will be used to show suggestions. If you want to customize the matcher, use the next form

----- `function(query:string) :array<object>`

With this form , you can customize the matcher & return complex object. If objects are not string you must define itemRender, itemValue & itemKey

Examples :

```javascript

// I want to customize the matcher to return string "starting with" the query only
const data = [ .. ];

<TokenSource data={ (query) => data.filter((el) => el.indexOf(query) === 0) } .. />

// I want to return complex object
const twitterUsers = [ .. ];

function userIsMatching(user, query) {
 return ~user.screen_name.toLowerCase().indexOf(query.toLowerCase())
        || ~user.name.toLowerCase().indexOf(query.toLowerCase());
}

<TokenSource data={ (query) => twitterUsers.filter((user) => userIsMatching(user, query)) } .. />
```

----- `function(query:string) :function callback(itemsMatching:array<object>)` for asynchronous suggestions

TODO doc

# Todo


	Objectif du jour:
		- clean up
		- check with new accounts
		- read useEffect

	Account
		- localisation slider

	Match:
		- getuserinfo

	Search:

	Chat:

	Notif:

	Login / Signup:
		- problem with default route (nomatch)
		- view mobile



	Learn:
		- useEffect micka post
	
	Components:
		- switch button	https://material-ui.com/components/switches/
		- picture list https://material-ui.com/components/grid-list/

	Others:
		- faire un carousel pour les photos
		- faire la vue mobile signup
		- faire la vue mobile login
		- utiliser la snackbar de material ui ?


	Ask Guillaume:
		- comment wait un console.log dans un call a l api
		- wtf with react dev tool
		- help with useStyle() https://material-ui.com/styles/basics/

	Color:
		- #FF3860

		faire une div 150px / 150px
		img height / width = 150px
		overflow hidden

# React Hooks

	Ok - Read hooks documentation

	Ok - useState
	Ok - useEffect

	
	- Read https://overreacted.io/a-complete-guide-to-useeffect/
	- Read https://reactjs.org/docs/hooks-reference.html
	
	- useContext
	- useReducer
	- useCallback
	- useMemo
	- useRef
	- useImperativeHandle
	- useLayoutEffect
	- useDebugValue
	- useCustom (custom hook)

	################### DONE ###################

# React Basic

	- History { 2013 - facebook - opensource - active and huge community }
	- Web components { a new design }
	- Jsx and rendering { html in javascript }
	- Conditional rendering { render what you need for a context }
	- State and lifecycle { top => bottom: state become props }
	- State and lifecycle { bottom => top: pass callback from parent to child component }
	- List and keys { allow react self organize better than with basic index }
	- Virtual dom { abstract render managment }
	- Function syntax { render "basic" component without state }
	- Object syntax { create logic components => constructor, binding, this scope }
	- Render props { sharing code between components using a prop whose value is a function }
	- Lift state / higher order component { better design pattern }
	- Routes { navigate in the app: react router dom }
	- Context

	Unclear - Hooks { a new design pattern }
	Unclear - Composition vs inheritance



## Ressources

		
	Done - React Tutorial : https://reactjs.org/docs/getting-started.html
	Done - React Documentation : https://reactjs.org/docs/getting-started.html
	Done - Hook Documentation https://reactjs.org/docs/hooks-intro.html
	Done - Openclassroom Tutorial : https://openclassrooms.com/fr/courses/4286486-build-web-apps-with-reactjs


	Viewed - Youtube: Why Hooks: => https://www.youtube.com/watch?v=eX_L39UvZes&t=536s
	Viewed - Youtube: Hooks in 15 minutes => https://www.youtube.com/watch?v=d9Pndaq9MJs
	Viewed - Youtube: React router dom tutorial => https://www.youtube.com/watch?v=110dW3l5GQY

# Questions

	this.setState((prevState, props) => ({
	  color: prevState.color === 'red' ? 'blue' : 'red'
	 }));

	let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);

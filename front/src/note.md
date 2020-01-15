# Todo


	################### IN PROGRESS ###################
	
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

# React Native

	Ok - History {2013 - facebook - opensource - active and huge community}
	Ok - Web components {a new design}
	Ok - Jsx and rendering {html in javascript}
	Ok - Conditional rendering {render what you need for a context}
	Ok - State and lifecycle {top => bottom: state become props}
	Ok - State and lifecycle {bottom => top: pass callback from parent to child component}
	Ok - List and keys {allow react self organize better than with basic index}
	Ok - Virtual dom {abstract render managment}
	Ok - Function syntax {render "basic" component without state}
	Ok - Object syntax {create logic components => constructor, binding, this scope}
	Ok - Render props {sharing code between components using a prop whose value is a function}
	Ok - Lift state / higher order component {better design pattern}
	Ok - Routes {navigate in the app: react router dom}
	
	Unclear - Hooks {a new design pattern}
	Unclear - Composition vs inheritance



## Ressources

		
	Done - React Tutorial : https://reactjs.org/docs/getting-started.html
	Done - React Documentation : https://reactjs.org/docs/getting-started.html
	Done - Hook Documentation https://reactjs.org/docs/hooks-intro.html
	Done - Openclassroom Tutorial : https://openclassrooms.com/fr/courses/4286486-build-web-apps-with-reactjs


	Viewed - Youtube: Why Hooks: => https://www.youtube.com/watch?v=eX_L39UvZes&t=536s
	Viewed - Youtube: Hooks in 15 minutes => https://www.youtube.com/watch?v=d9Pndaq9MJs
	Viewed - Youtube: React router dom tutorial => https://www.youtube.com/watch?v=110dW3l5GQY

# Tools

	Fontawsome: https://fontawesome.com/
	Bulma: https://bulma.io/

# Questions

	function Example(props) {You can use Hooks here! return ;}
	const Example = (props) => {You can use Hooks here! return ;}

	this.setState((prevState, props) => ({
	  color: prevState.color === 'red' ? 'blue' : 'red'
	}));

	let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);

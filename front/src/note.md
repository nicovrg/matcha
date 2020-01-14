# Todo

	- Read hooks documentation
	- Refacto Existing objects to use hooks

	Done - useState
	Done - useEffect
	
	- useContext
	- useReducer
	- useCallback
	- useMemo
	- useRef
	- useImperativeHandle
	- useLayoutEffect
	- useDebugValue
	- useCustom (custom hook)

# React Class Components

	Unclear - Composition vs inheritance

	Done - History {2013 - facebook - opensource - active and huge community}
	Done - Web components {a new design}
	Done - Jsx and rendering {better than <?= =>}
	Done - Conditional rendering {render what you need for a context}
	Done - State and lifecycle {top => bottom: state become props}
	Done - State and lifecycle {bottom => top: pass callback from parent to child component}
	Done - List and keys {allow react self organize better than with basic index}
	Done - Virtual dom {abstract render managment}
	Done - Function syntax {render "basic" component without state}
	Done - Object syntax {create logic components => constructor, binding, this scope}
	Done - Lift state {better design pattern}
	Done - Routes {navigate in the app: react router dom}
	Done - Hooks {a new design pattern}

# React Hooks


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

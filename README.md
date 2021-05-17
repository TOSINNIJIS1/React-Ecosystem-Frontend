# Instructed and Directed by Shaun Wassell

# npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
# @babel/preset-env ==> handle the transformation of es6
# @babel/preset-react ==> handle jsx properly

# npm install react react-dom
# npm install redux-thunk redux-devtools-extension @babel/runtime
<!-- This is the development version of the Babel runtime package we just installed -->
# npm install --save-dev @babel/plugin-transform-runtime 
<!-- Web Pack -->
# npm install --save-dev webpack@4.32.2 webpack-cli@3.3.2 webpack-dev-server@3.5.1 style-loader css-loader babel-loader

# Redux Store ==> stores any data
# Redux Actions => JSON objects consisting of action type and payload.
<!-- explicitly define the different event that can occur in our application for example you want to sign out === "LOG_OUT_USER -->
# Redux Reducers => Redux way of specifying what should happen to our Redux store or our central state when a given action occurs
<!-- for example when your have "LOG_OUT_USER" action, you logout the user [...] Action ===> Reducer ===> Result --> 

# Note
# Components can only interact with the state by triggering Redux actions ==> This means the only changes that are allowed to take place in our appliction are the changes that we specify in our Reducers.
# Unidirectional Data Flow ==> UI Trigger Action --> State is updated ---> Component See Updated State

# npm install redux react-redux
<!-- create a new file in our directory called store.js ==> where the redux logic goes-->

# npm install redux-persist
<!-- Redux Persist helps our create to do persist on refresh -->

# Redux best practice
<!-- 1. When you connect components to the redux store, your file should export both the unconnected and connected versions of that component. -->
#       Reason
<!--    1. The reason for this is that the connected version of your component is usually what the rest of the application will want to use -->
<!--    2. Your test shouldn't care whether your component is connected or not. Your test should simply check to see whether or not your components render the correct JS, given a specific set of props.
-->

<!-- 2. You should never trigger any other actions inside your reducers or perform any kind of asynchronous operations such as fetching data from the network -->
# Reducers are specifically meant to take the current state of the redux store and combine it with action to get the updated state

<!-- 3. Think carefully before connecting components, because connecting a component, in practice, can make it less reusable -->
<!-- For example: our redux application is todos ===> TodoList, if we need to check the complete and the incomplete we need a container to split. which will be like this todos ===> container ===> TodoList(complete)
                                                                            ===> TodoList(incomplete)
                            instead of 
                                                        todos ===> TodoList(complete)
                                                                ==> TodoList(incomplete)
-->

<!-- in other word, we should avoid connecting components to the store if we plan on reusing them throughout our app with different data. Instead, we should have some kind of component that's connected to the store and passed the correct data to these reusable components -->


# Why Redux Thunk
<!-- Without Redux our component is just a big components in one page, but with redux, we can use reducers and manage different components -->

<!-- Redux === State management -->
<!-- Component === View Logic and side effects -->
<!-- Side effects === fetching or updating server data -->

# We want our compoenent to have only one concern, which is to correctly display the data we give them
<!-- so the side effect should be moved out of our component, if possible, and it is possible -->
<!-- by using side effect libraries in our applications -->

# Side Effects Libraries
<!-- There are several side effects libraries available to React-developers -->
<!-- Redux Thunk -->
<!-- Redux Saga -->
<!-- Redux Logic -->

<!-- Two of the most popular ones are: -->

# Redux Thunk
# Redux Saga

# Goal
<!-- The goal of the side effect library is the same, which is to give us a way to seperate the side effects of our application from the components-->

# Side Effects Libraries Popularity
<!-- Redux Saga is in a big lead ===> Github stars -->
<!-- but Redux Thunk is relative simple and have small learning curves. -->

# How Does Redux Thunk Works!?

<!-- Redux Thunk works by tapping into the normal redux data flow -->
<!-- so, if we have our normal unidirectional dataflow where our components trigger actions, those actions cause predictable change to the data in our redux store and the data changes are reflected in our components-->


#                     ---- UI Trigger Action ----
#                    |                           |
#                    |                           ∨
#  Components See updated State        State is Updated
#                    ^                           |
#                    |                           |
#                     ---------------------------

<!-- Redux Thunk helps us add a sort of fork into this loop, where we can put logic for our side effects -->
<!-- e.g loading data or some other performing asynchronous operation -->

#                 ---- UI Trigger Action ---- ---------
#                 |                           |         |
#                 |                           |         ∨
#                 |                           |   Load Data, etc
#                 |                           ∨         
#  Components See updated State        State is Updated
#                 ^                           |
#                 |                           |
#                  ---------------------------

<!-- So, our components can dispatch a regular Redux action, which goes straight to the reducer and make some relevant changes to the store.   -->

#                     Component
#                        /
#              dispatch / 
#                      /
#                     ∨
#                SOME_ACTION
#                    /
#                   /
#                  ∨
#                REDUCERS
#                /
#               /
#               ∨
#        {REDUX STORE}

<!-- or our components can dispatch a Thunk that performs whatever async or conditional operations we want, and then dispatches its own redux actions based on the result of those operation  -->

#                     Component
#                      /    \
#            dispatch /      \ dispatch
#                    /        \
#                   ∨          \
#              SOME_ACTION     SOME THUNK
#                  /                |    
#                 /                 |
#                ∨                  ∨
#             REDUCERS            Storage
#               /
#              /
#             ∨
#        {REDUX STORE}

<!-- For example Let's say that we have a UserProfilePage and we want our app to load a user's data from the server when the page is opened. Now, without Redux Thunk the way we might do this is by putting our fetching logic in the componentDidMount life cycle method or by using a useEffect hook and then, once the data is loaded, we dispatch a LOAD_USER_SUCCESS action with the new data that we loaded. Or if the fetching failed for some reason, we'd dispatch a LOAD_USER_ERROR action that might set some error flag in our Redux store. So this works, but again, the loading logic doesn't really belong inside of our components. -->



# UserProfilePage ---> componentDidMount / useEffect --> LOAD_USER_SUCESS || LOAD_USER_ERROR
#                                    |
#                                    |
#                                    v
#                                  Data

<!-- We should strive to keep our components as focused as possible on their purpose, taking data and rendering it. And here's where Thunks come in. Remember in previous videos when we defined Redux actions that Redux actions are just objects that contain a type property and perhaps some other data in the actions payload. When we dispatch a Redux action, Redux calls a our reducers with this action and the reducers determine what the state should look like afterward. So what a Thunk is, is when instead of dispatching a Redux action, which is, again, just a JavaScript object, we pass a function to dispatch and this function is where we put whatever async operations we want to perform, such as loading data. And we can also dispatch other actions or even other Thunks from inside this function. We'll see just how to do this in a later video. So then, as I said before, Thunks basically add a fork to our basic unidirectional dataflow. Instead of dispatching only bare Redux actions, our components can also dispatch Thunks, which perform asynchronous operations and can dispatch their own actions or Thunks. And the point of all of this is that it allows us to almost completely remove our side-effect logic from our components, thus increasing our separation of concerns. -->

# Seperation of Concern
<!-- Reducers is managing the state -->
<!-- Thunks is managing our side effects logic -->
<!-- Selectors so that our component to know how our state is set up or contain any logic for transforming the data we get from the state -->


# Styled components are what we referred to as CSS and JavaScript
# npm install styled-components
<!-- It allow us to define styles inside our j -->
<!-- It allow us to define our own UI components that we can pass props to -->
<!--  -->
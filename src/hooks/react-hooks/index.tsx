// import React, {Suspense, useReducer, useState, useTransition} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import useFetch from './custom hooks/useFetch';
// import {Slider} from '@react-native-assets/slider';
// import { Console, log } from 'console';

// const ADD_TODO = 'ADD_TODO';
// const REMOVE_TODO = 'REMOVE_TODO';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case ADD_TODO:
//       return [...state, { id: Date.now().toString(), text: action.payload }];
//     case REMOVE_TODO:
//       return state.filter(todo => todo.id !== action.payload);
//     default:
//       return state;
//   }
// };

// const HooksSamples = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [todos, dispatch] = useReducer(reducer, []);

//   const addTodo = () => {
//     if (inputValue.trim() !== '') {
//       dispatch({ type: ADD_TODO, payload: inputValue });
//       setInputValue('');
//     }
//   };

//   const removeTodo = (id) => {
//     dispatch({ type: REMOVE_TODO, payload: id });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         value={inputValue}
//         onChangeText={setInputValue}
//         placeholder="Enter a todo"
//         style={styles.input}
//       />
//       <Button title="Add Todo" onPress={addTodo} />
//       <FlatList
//         data={todos}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.todoItem}>
//             <Text>{item.text}</Text>
//             <TouchableOpacity onPress={() => removeTodo(item.id)}>
//               <Text style={styles.removeButton}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     marginTop: 50,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//   },
//   todoItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   removeButton: {
//     color: 'red',
//   },
// });

// export default HooksSamples;

// import React, { useMemo, useState } from 'react';
// import { View, Text, Button } from 'react-native';

// const HooksSamples = () => {
//   const [count, setCount] = useState(0);
//   const expensiveCalculation = useMemo(() => {
//     return count * 2;
//   }, [count]);

//   return (
//     <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
//       <Text>Calculation: {expensiveCalculation}</Text>
//       <Button title="Increment" onPress={() => setCount(count + 1)} />
//     </View>
//   );
// };

// export default HooksSamples

// import React, { useCallback, useId, useState, useTransition } from 'react';
// import { View, Text, Button } from 'react-native';

// const HooksSamples = () => {
//   const [count, setCount] = useState(0);
//   const increment = useCallback(() => {
//     setCount(count + 1);
//   }, [count]);

//   const id = useId()
//   const id1 = useId()

//   const [isLoading , setIsLoading] = useTransition()
//   console.log(isLoading,'efefef')
//   return (
//     <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

//         <Text>Id : {id}</Text>
//         <Text>Id1 : {id1}</Text>

//       <Text>Count: {count}</Text>
//       <Button title="Increment" onPress={increment} />
//     </View>
//   );
// };

// export default HooksSamples;

// import React, { useReducer, useState, useTransition } from 'react';
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// const ADD_TODO = 'ADD_TODO';
// const REMOVE_TODO = 'REMOVE_TODO';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case ADD_TODO:
//       return [...state, { id: Date.now().toString(), text: action.payload }];
//     case REMOVE_TODO:
//       return state.filter(todo => todo.id !== action.payload);
//     default:
//       return state;
//   }
// };

// const HooksSamples = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [todos, dispatch] = useReducer(reducer, []);
//   const [isPending, startTransition] = useTransition();

//   const addTodo = () => {
//     if (inputValue.trim() !== '') {
//       startTransition(() => {
//         dispatch({ type: ADD_TODO, payload: inputValue });
//       });
//       setInputValue('');
//     }
//   };

//   const removeTodo = (id) => {
//     startTransition(() => {
//       dispatch({ type: REMOVE_TODO, payload: id });
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         value={inputValue}
//         onChangeText={setInputValue}
//         placeholder="Enter a todo"
//         style={styles.input}
//       />
//       <Button title="Add Todo" onPress={addTodo} />

//       {!isPending && <Text>transition pending..</Text>}
//       <FlatList
//         data={todos}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.todoItem}>
//             <Text>{item.text}</Text>
//             <TouchableOpacity onPress={() => removeTodo(item.id)} disabled={isPending}>
//               <Text style={styles.removeButton}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     marginTop: 50,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//   },
//   todoItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   removeButton: {
//     color: 'red',
//   },
// });

// export default HooksSamples;

// const HooksSamples = () => {

// const data = useFetch('https://jsonplaceholder.typicode.com/todos/1')

// console.log('====================================');
// console.log(data);
// console.log('====================================');

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Button title="fetch with custom hook" />
//     </View>
//   );
// };

// export default HooksSamples;

import React, {useState, useTransition, Suspense, useEffect} from 'react';
import {View, Text, Button, FlatList, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import useFetch from './custom hooks/useFetch';

interface DataItem {
  a: string;
}

const HooksSamples: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const data = useFetch('https://jsonplaceholder.typicode.com/users');

  const [users, setUsers] = useState<any>();

  const [result, setResult] = useState();

  const [query, setQuery] = useState();

  useEffect(() => {
    data && setUsers(data);
  }, [data]);

  const handleChange = e => {
    setQuery(e);
    startTransition(() => {
      setTimeout(() => {
        setResult(
          users?.filter(item => item.username.toUpperCase().includes(e)),
        );
      }, 2000);
    });
  };

  const normalFn = e => {
    setQuery(e);
    setTimeout(() => {
      setResult(users?.filter(item => item.username.toUpperCase().includes(e)));
    }, 2000);
  };
  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Text accessibilityLabel="transition button">
        Transition : {isPending ? 'true' : 'false'}
      </Text>
      <TextInput
        mode="flat"
        inputMode="text"
        onChangeText={e => handleChange(e.toUpperCase())}
        style={{borderWidth: 1, borderColor: 'white', width: 200}}
      />
      <TextInput
        mode="flat"
        inputMode="text"
        onChangeText={e => normalFn(e.toUpperCase())}
        style={{
          borderWidth: 1,
          borderColor: 'white',
          width: 200,
          marginTop: 10,
        }}
      />
      {query && <Text>Searching For ...{query}</Text>}

      <Button title='transiton button ' accessibilityLabel='transition button'/>

      <>  
        <FlatList
          style={{width: '100%'}}
          data={result}
          renderItem={({item}) => (
            <View>
              <Text style={{color: 'white', textAlign: 'center'}}>
                {item.username}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    </View>
  );
};

export default HooksSamples;

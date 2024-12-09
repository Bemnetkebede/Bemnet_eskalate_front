import {createContext, useReducer} from "react";
// import { initialState ,reducer } from "../../Utility/reducer";



export const DataContext = createContext()

export const DataProvider = ({children , reducer , initialState }) => {   
    
    return (
        <DataContext.Provider value={useReducer(reducer , initialState   )}>
            {children}
        </DataContext.Provider>
    );
}

// import { createContext, useReducer } from "react";
// import {  useContext } from 'react';


// export const DataContext = createContext();

// export const DataProvider = ({ children, reducer, initialState }) => {
//   const [state, dispatch] = useReducer(reducer, initialState); // useReducer is called here

//     return (
//         <DataContext.Provider value={{ state, dispatch }}>
//         {children}
//         </DataContext.Provider>
//     );
// };





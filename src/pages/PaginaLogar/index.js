import Criar from './Criar';
import Login from './Login';

import { useState } from 'react';

export default function PaginaLogar({ setUser, navigation }) {

    const [isCriarConta, setIsCriarConta] = useState(false);
    if (!isCriarConta) {
        return (
            <Login setUser={setUser} setIsCriarConta={setIsCriarConta} navigation={navigation}/>
        );
    } else {
        return (
            <Criar setUser={setUser}  setIsCriarConta={setIsCriarConta}/>
        );
    }


}
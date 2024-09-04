import Criar from './Criar';
import Login from './Login';

import { useState } from 'react';

export default function PaginaLogar({ setUser, navigation, setLoginFeito }) {
    const [user, setUser] = useState(false);
    const [isCriarConta, setIsCriarConta] = useState(false);


    if (!isCriarConta) {
        setLoginFeito(user);
        return (
            <Login setUser={setUser} setIsCriarConta={setIsCriarConta} navigation={navigation} />
        );
    } else {

        return (

            <Criar setUser={setUser} navigation={navigation} setIsCriarConta={setIsCriarConta} />
        );
    }


}
import foru from './foru';
import explorar from './explorar';

import { useState } from 'react';

export default function PaginaLogar({ navigation }) {

    createStackNavigator({
    foru: foru,
    explorar: explorar,
    })

}
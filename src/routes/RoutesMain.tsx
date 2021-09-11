import React from 'react';
import {useMyContext} from '../context/AuthProvider';

import {RoutesPrivadas} from './RoutesPrivadas';
import {RoutesPublicas} from './RoutesPublicas';

export const RoutesMain: React.FC = () => {
  const {isLogado} = useMyContext();
  return isLogado ? <RoutesPrivadas /> : <RoutesPublicas/>
}


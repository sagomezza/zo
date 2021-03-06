import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from "../HomeStack/index";
import DrawerContent from '../../components/DrawerContent';


const Drawer = createDrawerNavigator();

const MainDrawer = (props) => {


    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name='Back' component={HomeStack} />
        </Drawer.Navigator>
    );
};



export default MainDrawer;


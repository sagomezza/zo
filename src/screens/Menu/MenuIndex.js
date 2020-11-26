// // import React from 'react';
// // import { createAppContainer, DrawerActions } from 'react-navigation';
// // import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
// // import {SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
// // import { Header } from 'react-native-elements';

// // import LogoutIndex from '../Logout/LogoutIndex';
// // import Transactions from '../Transactions/TransactionsIndex';
// // import ActiveServices  from '../ActiveServices/ActiveServicesIndex';
// // import NewsReport  from '../NewsReport/NewsReportIndex';
// // import MonthlyPayments  from '../MonthlyPayments/MonthlyPaymentsIndex';


// // const MenuList = createDrawerNavigator(
// //     {
// //          'Transacciones': { screen: Transactions },
// //          'Servicios activos': { screen: ActiveServices },
// //          'Reporte de novedad': { screen: NewsReport },
// //          'Mensualidades': { screen: MonthlyPayments },
// //          'Cierre de sesión': { screen: LogoutIndex }
 
// //      },
// //      {
// //          contentComponent: props => < CustomDrawerComponent {...props} />
// //      }
// //  );

// //  const CustomDrawerComponent = (props) => (
// //     <SafeAreaView
// //     // forceInset={{ top: 'always', horizontal: 'never' }}
// //     >
// //         <DrawerNavigatorItems  {...props} />
// //     </SafeAreaView>
// // );
// //  const AppContainer = createAppContainer(MenuList);

// //  const Menu = (props) => {
// //     return( 
// //         <View>   
// //             <AppContainer/>   
        
// //         <View>
// //             <Header containerStyle={{ backgroundColor: 'white', }}>                    
// //                 <TouchableOpacity onPress={() => props.navigation.openDrawer() } >
// //                     <Text>menu</Text>
// //                     <Image style={{ width: 50, height: 50, tintColor: '#1F73BD' }} />                    
// //                 </TouchableOpacity>                
            
// //             </Header>
// //         </View>
// //         </View>    
// //     )
// // };

// // export default Menu;

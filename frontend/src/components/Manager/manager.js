import React, { useState, useEffect } from 'react'
import { AppBar, 
        Tabs, 
        Tab, 
        Tooltip,
        Button,
        makeStyles } from '@material-ui/core'
import { MailOutline,
        WorkOutline,
        Person ,
        PowerSettingsNew} from '@material-ui/icons'
import Routes from './routes'
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nav: {
        boxShadow: 'none',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: '25px',
        letterSpacing: '1px',
        fontWeight: '400',
        margin: '8px 30px',
        float: 'left'
    },
    tabButton: {
        paddingTop: '8px',
        '&.Mui-selected': {
            outline: 'none',                                                                   
        },
        '&:hover': {
            outline: 'none'
        }
    },
    icon: {
        margin: '0 5px',
        fontSize: '25px',
        transform: 'translate(0, -2px)'
    },
    logout: {
        float: 'right',
        margin: '8px 10px',
        '&.Mui-selected': {
            outline: 'none',                                                                   
        },
        '&:hover': {
            outline: 'none'
        }
    },
    tab: {
        float: 'left'
    }
}))

function Manager() {

    let classes = useStyles()
    let location = useLocation()
    let history = useHistory()

    const [tabValue, setTab] = useState(0)

    useEffect(() => {
        const path = location.pathname
        if(path === '/manager/received') {
            setTab(0);
        }
        if(path === '/manager/employees') {
            setTab(1);
        }
        if(path === '/manager/profile') {
            setTab(2);
        }
    }, [location])

    const handleTabChange = (e, value) => {
        const tabValue = value
        setTab(tabValue)
        
        switch(tabValue) {
            case 0:
                history.push('/manager/received');
                break;
            case 1:
                history.push('/manager/employees');
                break;
            case 2:
                history.push('/manager/profile');
                break;
            default:
                history.push('/manager/received');
                break;
        }
    };

    const handleLogout = (e) => {
        sessionStorage.clear()
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <AppBar position='static' color='default' className={classes.nav}>
                <div className='d-inline-block'>
                    <p className={classes.title}>PULSE &mdash; X</p>
                    <Tabs
                     value={tabValue}
                     onChange={handleTabChange}
                     indicatorColor='primary'
                     textColor='primary'
                     className={classes.tab}
                    >
                        <Tab 
                         label={<div><MailOutline className={classes.icon}/>Received</div>} 
                         className={classes.tabButton}/>
                        <Tab 
                         label={<div><WorkOutline className={classes.icon}/>Employees</div>}  
                         className={classes.tabButton}/>
                        <Tab 
                         label={<div><Person className={classes.icon}/>My Profile</div>} 
                         className={classes.tabButton}/>
                    </Tabs>
                    <Tooltip title='Logout' className={classes.logout}>
                        <Button color='secondary' variant='contained' onClick={handleLogout}>
                            <PowerSettingsNew/>
                        </Button>
                    </Tooltip>
                </div>
            </AppBar>
            <Routes/>
        </div>
    )
}

export default Manager;
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Settings } from '../../components'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'

import IconApps from 'grommet/components/icons/base/Apps'
import IconConfigure from 'grommet/components/icons/base/Configure'
import IconCluster from 'grommet/components/icons/base/ServerCluster'
import IconHome from 'grommet/components/icons/base/Home'

const App = () => {
    return (
        <div>
            <Header>
                <Title>Oasis</Title>
                <Box flex={true} justify="end" direction="row">
                    <Menu icon={<IconApps />} dropAlign={{ right: 'right' }}>
                        <Anchor icon={<IconHome />} label="Home" path="/" />
                        <Anchor
                            icon={<IconCluster />}
                            label="Manage hosts"
                            path="/hosts"
                        />
                        <Anchor
                            icon={<IconConfigure />}
                            label="Settings"
                            path="/settings"
                        />
                    </Menu>
                </Box>
            </Header>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </div>
    )
}

export default App

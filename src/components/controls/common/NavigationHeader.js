import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import CommonUtils from '../../../api/objects/commonUtils';

const NavigationHeader = (fiscalYears, jobs) => {

  function navigateDashboard() {
    //context.router.push('Home.aspx');
  }

  function navigateStandardItems() {
    //context.router.push('StandardItems.aspx');
  }

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
        <span onChange={navigateDashboard()}>
          <Glyphicon
            className="ti-moduleGlyph"
            title="Dashboard"
            glyph='home'/>
        </span>
        </Navbar.Brand>
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav>

          <MenuItem
            eventKey={1}
            href="#">
            <span onClick={navigateStandardItems()}>Std. Items</span>
          </MenuItem>

          <MenuItem
            eventKey={2}
            href="#">
            <Link to="tickets">Build Plan</Link>
          </MenuItem>

          <NavDropdown
            className="ti-moduleGlyph"
            eventKey={1}
            title="CheckPoints"
            id="basic-nav-dropdown">

            <MenuItem header>CheckPoints</MenuItem>
            <MenuItem
              eventKey={1.5}
              href="#">
              <Glyphicon
                className="menu-glyph"
                title='setupcheckpoint'
                glyph='dashboard'/>&nbsp; <Link to="checkpoints">Setup</Link>
            </MenuItem>

            <MenuItem divider/>
            <MenuItem header>Reporting</MenuItem>
            <MenuItem
              eventKey={1.6}
              href="#">
              <Glyphicon
                title='checkpointresults'
                glyph='tasks'/>&nbsp; <Link to="checkpointresults">Results</Link>
            </MenuItem>

          </NavDropdown>

          <NavDropdown
            className="ti-moduleGlyph"
            eventKey={1}
            title="Tools"
            id="basic-nav-dropdown">

            <MenuItem divider/>
            <MenuItem header>Admin</MenuItem>
            <MenuItem
              eventKey={1.5}
              href="#">
              <Glyphicon
                className="menu-glyph"
                title='clearCache'
                glyph='folder-open'/>&nbsp; Clear Cache
            </MenuItem>

            <MenuItem
              eventKey={1.6}
              href="#">
              <Glyphicon
                title='createNewFiscalYear'
                glyph='download-alt'/>&nbsp; Create New Fiscal Year
            </MenuItem>

            <MenuItem divider/>
            <MenuItem header>File Management</MenuItem>
            <MenuItem
              eventKey={1.5}
              href="#">
              <Glyphicon
                className="menu-glyph"
                title='files:'
                glyph='folder-open'/>&nbsp; Upload Files
            </MenuItem>

            <MenuItem divider/>
            <MenuItem header>Reporting</MenuItem>
            <MenuItem
              eventKey={1.6}
              href="#">
              <Glyphicon
                title='viewExport'
                glyph='download-alt'/>&nbsp; View & Export
            </MenuItem>


          </NavDropdown>

        </Nav>
        <Nav pullRight>
          <NavItem eventKey={4}>
            <Glyphicon
              className="menu-glyph-active"
              title='user:'
              glyph='user'/>&nbsp; User: {CommonUtils.getCookie("Username")}
          </NavItem>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};

NavigationHeader.contextTypes = {
  //router: PropTypes.object
};

export default NavigationHeader;





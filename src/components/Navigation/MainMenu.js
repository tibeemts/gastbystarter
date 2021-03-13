import React from 'react'
import { useMenuQuery } from '../../hooks/useMainMenu';
import UniversalLink from "../../utils/UniversalLink"
import DropdownIcon from '../../utils/dropdown-icon'


const MainMenu = () => {

    const menu = useMenuQuery()
    
    return (
        <section className="mtsnav-cover">
            <div className="container">
                <input type="checkbox" name="" id="check" />
                <nav className="mtsnavbar" >
            <ul>
             
              {menu.wpMenu.menuItems.nodes.map((item, i) => {
                
                const hasChildren = null != item.childItems.nodes ? item.childItems.nodes.length : false;

                const parentMenuLink = (
                      <UniversalLink
                      to={path}
                      activeClassName={"current-menu-item current_page_item"}
                    >
                    {item.label}
                    
                    </UniversalLink>

                );

                const path = item?.connectedNode?.node?.uri ?? item.url
                //ກໍ່ລະນີຖ້າຢາກໃສ່ id ໃຫ້ກັບ li ແມ່ນສາມາດຕັ້ງຕົວແປງແລະ ໃຊ່ເຂົ້າໄປໄດ້.
                const itemId = "menu-item-" + item.databaseId
                if (item.parentId) {
                  return null
                }

                return (
                  <li
                    id={itemId}
                    key={i + item.id}
                    className={
                      "mts-navlink menu-item menu-item-type-custom menu-item-object-custom menu-item-home " +
                      itemId
                    }
                  >
                    
                    { hasChildren ? (
                        <UniversalLink
                          to={path}
                          activeClassName={"current-menu-item current_page_item"} >
                        {item.label}
                        <DropdownIcon />
                      </UniversalLink>
                      
                    ) :
                      <UniversalLink
                    to={path}
                    activeClassName={"current-menu-item current_page_item"} >
                    {item.label}
                      </UniversalLink>
                    }

                    { /* Child Menu */}
                    
                    {item.childItems.nodes && item.childItems.nodes.length > 0 ? (
                          //level 2 menu
                      <div className="mtsnav-dropdown">
                        
                            <ul>
                              {item.childItems.nodes.map((subItem) => {
                                const subPath =
                                  subItem?.connectedNode?.node?.uri ??
                                  subItem.url

                                return [
                                  <li
                                    key={subItem.id}
                                    className="dropdown-link"
                                  >
                                    <UniversalLink
                                      to={subPath}
                                      activeClassName={
                                        "current-menu-item current_page_item"
                                      }
                                    >
                                      {subItem.label}
                                    </UniversalLink>
                                    
                                    {subItem.childItems.nodes &&
                                    subItem.childItems.nodes.length > 0 ? (
                                      <div className="mtsnav-dropdown second">
                                        <ul>
                                          {subItem.childItems.nodes.map(
                                            (subItemItem) => {
                                              const subSubPath =
                                                subItemItem?.connectedNode?.node
                                                  ?.uri ?? subItemItem.url

                                              return [
                                                <li
                                                  key={subItemItem.id}
                                                  className="dropdown-link"
                                                >
                                                  <UniversalLink
                                                    to={subSubPath}
                                                    activeClassName={
                                                      "current-menu-item current_page_item"
                                                    }
                                                  >
                                                    {subItemItem.label}
                                                  </UniversalLink>
                                                </li>
                                              ]
                                            }
                                          )}
                                          <div className="arrow"></div>
                                        </ul>
                                      </div>
                                    ) : null}
                                  </li>
                                ]
                              })}
                              <div className="arrow"></div>
                            </ul>
                        </div>
                        
                        ) : null}
                  </li>
                )
              })}
  
            </ul>
          </nav>
          { /* Child Menu */}
          <div class="hamburger-menu-container">
                <div class="hamburger-menu">
                    <div></div>
                </div>
          </div>
            </div>
        </section>
    )
}
export default MainMenu;
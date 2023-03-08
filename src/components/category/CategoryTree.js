import React, {useEffect} from 'react';

import {Col, Input, Row, Tree} from 'antd';
import { useMemo, useState } from 'react';
import useCategories from "../../hooks/useCategories";
import categoriesTreeHelper from "../../helpers/categoriesTreeHelper";
import {useNavigate} from "react-router-dom";
import {DownOutlined} from "@ant-design/icons";
const { DirectoryTree } = Tree;

const CategoryTree = () => {
    const [categories, setCategories] = useCategories();
    const navigate = useNavigate();

  const treeData = categories.reduce((rootAcc, rootCurr)=> {

      const subCategories = rootCurr.subCategory.reduce((subAcc, subCurr)=>{

          const subChildren = subCurr.children !== undefined && subCurr.children.reduce((subChildAcc, subChildCurr, index) => {
              return [...subChildAcc, {
                  title: <span onClick={()=> handleSubCategoryChild(subCurr._id, subChildCurr, index)}>{subChildCurr}</span>,
                  key: subChildCurr + ','+ subCurr._id }]
          }, [])

          return [...subAcc, {
              title: <span onClick={()=> handleSubcategory(subCurr._id, subCurr.name, rootCurr._id)}>{subCurr.name}</span>,
              key: subCurr._id,
              children: subChildren
          }]
      }, [])

      return [...rootAcc, {
          title: <span onClick={()=> handleParentCategory(rootCurr._id, rootCurr.name)}>{rootCurr.name}</span>,
          key: rootCurr._id,
          children: subCategories
      }]
  }, [])

    const handleParentCategory = (id, name)=>{
        navigate('/admin/category-create', {
            state: {
                id, name, form: 'root', action: 'update'
            }
        })
    }

    const handleSubcategory = (id, name, parentID)=>{
        navigate('/admin/category-create', {
            state: {
                id, name, parentID, form: 'sub', action: 'update'
            }
        })
    }

    const handleSubCategoryChild = (id, name,index)=>{
        navigate('/admin/category-create', {
            state: {
                id, name, index, form: 'sub', action: 'childcreate'
            }
        })
    }


    const dataList = []

/*    const generateList = (data) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { key, title } = node;
            dataList.push({
                key,
                title,
            });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(defaultData);

    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };
    const onChange = (e) => {
        const { value } = e.target;

        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, defaultData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const treeData = useMemo(() => {
        const loop = (data) =>
            data.map((item) => {
                const strTitle = item.title;
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
              {beforeStr}
                            <span className="site-tree-search-value">{searchValue}</span>
                            {afterStr}
            </span>
                    ) : (
                        <span>{strTitle}</span>
                    );
                if (item.children) {
                    return {
                        title,
                        key: item.key,
                        children: loop(item.children),
                    };
                }
                return {
                    title,
                    key: item.key,
                };
            });
        return loop(defaultData);
    }, [searchValue, categories]);*/

    const onSelect = (selectedKeys, info) => {
        console.log(selectedKeys[0])
        // console.log('selected', selectedKeys[0], info);
        navigate('/admin/category-create', {
            state: {
                id: selectedKeys[0]
            }
        })
    };



    return (
        <div>
            <Row>
                <Col span={12}>
                    {/*<Input*/}
                    {/*    style={{*/}
                    {/*        marginBottom: 8,*/}
                    {/*    }}*/}
                    {/*    placeholder="Search"*/}
                    {/*    onChange={onChange}*/}
                    {/*/>*/}
                </Col>
                <Col span={12} ></Col>
            </Row>
            <Tree
                showLine
                defaultExpandAll
                switcherIcon={<DownOutlined />}
                treeData={treeData}
            />
        </div>
    );
};
export default CategoryTree;
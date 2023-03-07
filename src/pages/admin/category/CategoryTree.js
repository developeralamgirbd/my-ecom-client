import React from 'react';

import {Col, Input, Row, Tree} from 'antd';
import { useMemo, useState } from 'react';
import useCategories from "../../../hooks/useCategories";
import categoriesTreeHelper from "../../../helpers/categoriesTreeHelper";

const CategoryTree = () => {
    const [categories, setCategories] = useCategories();
    // const defaultData = categoriesTreeHelper('title', categories);

  const defaultData = categories.reduce((acc, curr)=> {

      const subCategories = curr.subCategory.reduce((accumulator, currentValue)=>{

          const subChildren = currentValue.children !== undefined && currentValue.children.reduce((subChildAcc, subChildCurr) => {
              return [...subChildAcc, {title: subChildCurr, key: subChildCurr + ','+ currentValue._id }]
          }, [])

          return [...accumulator, {
              title: currentValue.name,
              key: currentValue._id,
              children: subChildren
          }]
      }, [])


      return [...acc, {
          title: curr.name,
          key: curr._id,
          children: subCategories
      }]
  }, [])


    const dataList = []

    const generateList = (data) => {
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
    }, [searchValue, categories]);

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys[0], info);
    };

    return (
        <div>
            <Row>
                <Col span={12}>
                    <Input
                        style={{
                            marginBottom: 8,
                        }}
                        placeholder="Search"
                        onChange={onChange}
                    />
                </Col>
                <Col span={12} ></Col>
            </Row>

            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={treeData}
                onSelect={onSelect}
            />
        </div>
    );
};
export default CategoryTree;
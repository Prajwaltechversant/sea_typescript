import React from 'react'
import renderer from 'react-test-renderer';
import Snapshot from './snapshot';
// import BackgroundTask from '../../../modules/backgroundActions/index';
import { sampleFunction } from './snapshot';
import { dummyAPIFn } from './snapshot';

jest.mock('./snapshot')

// it('renders correctly', () => {
//   // const tree = renderer
//   //   .create(<Snapshot   />)
//   //   .toJSON();
//   // expect(tree).toMatchSnapshot();
//   // console.log(tree)

//   // const snapshotFn = renderer
//   //   .create(<Snapshot />)
//   //   .getInstance()
//   // //   snapshotFn.instance()

//   // expect(sampleFunction(3)).toBe(10)
//   // snapshotFn.find()


// });

test('Test for fetch api - mock',async()=>{
    await dummyAPIFn.
})
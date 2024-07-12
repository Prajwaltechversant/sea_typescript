import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import InputBox from '../../components/InputElement';
import DatePickerComponent from '../../components/datePicker';
import {DataTable} from 'react-native-paper';
import {Education} from '.';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import uuid from 'react-native-uuid';
import styles from './style';
import {useScreenContext} from '../../context/ScreenContextProvider';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function DataArray({
  education,
  setEducation,
  addAnother,
  removeEducation,
}: any) {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);

  const [year, setYear] = useState<Date | string | null>();

  const [count, setCount] = useState(0);

  const [tempData, setTempData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: null,
    endDate: null,
    id: count,
  });
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  useMemo(() => {
    setTempData({...tempData, id: count});
  }, [count]);

  const allInputs = [
    {
      key: 'degree',
      label: 'Degree',
      name: 'textInput',
      type: 'text',
      fn: 'add',
    },
    {
      key: 'school',
      label: 'school / college',
      name: 'textInput',
      type: 'text',
      fn: 'add',
    },
    {
      key: 'startDate',
      label: 'Start Date',
      name: 'textInput',
      type: 'text',
      fn: 'add',
    },
    {
      key: 'endDate',
      label: 'end date',
      name: 'textInput',
      type: 'text',
      fn: 'add',
    },
  ];
  const [items] = React.useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  const updateAndUpload = () => {
    setCount(count + 1);
    addAnother(tempData);
    setTempData({
      school: '',
      degree: '',
      field: '',
      startDate: null,
      endDate: null,
      id: count,
    });
  };

  const {colors} = useTheme();
  const screenContext = useScreenContext();
  const isPortrait = screenContext.windowWidth > screenContext.windowHeight;
  const screenStyles = styles(
    screenContext,
    screenContext[isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[isPortrait ? 'windowHeight' : 'windowWidth'],
    colors,
  );

  // console.log('====================================');
  // console.log(education);
  // console.log('====================================');

  return (
    <>
      <View style={{marginVertical: 20}}>
        <Text>Education</Text>
        <InputBox
          label="school"
          onChangeText={value => setTempData({...tempData, school: value})}
          value={tempData.school}
          type="text"

        />
        <InputBox
          label="degree"
          onChangeText={value => setTempData({...tempData, degree: value})}
          value={tempData.degree}
          type="text"
        />
        <InputBox
          label="field"
          onChangeText={value => setTempData({...tempData, field: value})}
          value={tempData.field}
          type="text"
        />
        <Text>Start Date</Text>
        <InputBox
          setYear={value => setTempData({...tempData, startDate: value})}
          name="edu"
          type="date"
        />

        <Text>End Date</Text>
        <InputBox
          setYear={value => setTempData({...tempData, endDate: value})}
          name="edu"
          type="date"
        />
        <TouchableOpacity
          onPress={updateAndUpload}
          style={{
            backgroundColor: education.length > 0 ? 'blue' : 'green',
            height: 40,
            width: 130,
            borderRadius: 5,
            alignSelf: 'flex-end',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>
            {education.length > 0 ? 'Add Another' : 'Add Details'}
          </Text>
          <AntDesign name="pluscircleo" size={30} />
        </TouchableOpacity>
        {education?.length > 0 && (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>College</DataTable.Title>
              <DataTable.Title numeric>Degree</DataTable.Title>
              <DataTable.Title numeric>Start date</DataTable.Title>
              <DataTable.Title numeric>End date</DataTable.Title>
              <DataTable.Title numeric>End date</DataTable.Title>
            </DataTable.Header>
            {education?.map((item: any) => (
              <DataTable.Row key={item.key}>
                <DataTable.Cell>{item.school}</DataTable.Cell>
                <DataTable.Cell numeric>{item.degree}</DataTable.Cell>
                <DataTable.Cell numeric>{item.startDate}</DataTable.Cell>
                <DataTable.Cell numeric>{item.endDate}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <TouchableOpacity onPress={() => removeEducation(item.id)}>
                    <FontAwesome name="remove" size={20} />
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {/* <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            showFastPaginationControls
          /> */}
          </DataTable>
        )}
      </View>
    </>
  );
}

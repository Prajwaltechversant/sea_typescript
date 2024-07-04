          {/* <TextInput
            label="Name"
            placeholder="name"
            mode="outlined"
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
            style={screenStyles.inputContainer}
          />
          <TextInput
            label="Mobile"
            placeholder="Mobile Number"
            value={formData.mobile?.toString()}
            onChangeText={value => handleInputChange('mobile', value)}
            mode="outlined"
            style={screenStyles.inputContainer}
          />
          <View style={screenStyles.inputContainer}>
            <DatePickerComponent
              setNewDate={value => handleInputChange('dob', value)}
            />
          </View>
          {formData.age !== null && (
            <View>
              <Text style={{color: colors.text, textAlign: 'left'}}>
                {formData.age} Years
              </Text>
            </View>
          )}
          <>
            <TextInput
              label="address"
              value={formData.permanentAddress.address?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'address')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="city"
              value={formData.permanentAddress.city?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'city')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="state"
              value={formData.permanentAddress.state?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'state')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="country"
              value={formData.permanentAddress.country?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'country')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="pincode"
              value={formData.permanentAddress.pincode?.toString()}
              onChangeText={value =>
                handleInputChange('permanentAddress', value, 'pincode')
              }
              mode="outlined"
              style={screenStyles.inputContainer}
            />
          </>
          <Checkbox.Item
            label="Copy Permanent address"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          <>
            <TextInput
              label="address"
              value={
                checked
                  ? formData.permanentAddress.address?.toString()
                  : formData.temporaryAddress.address?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'address')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="city"
              value={
                checked
                  ? formData.permanentAddress.city?.toString()
                  : formData.temporaryAddress.city?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'city')
              }
              readOnly={checked ? true : false}
              mode="outlined"
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="state"
              value={
                checked
                  ? formData.permanentAddress.state?.toString()
                  : formData.temporaryAddress.state?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'state')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="country"
              value={
                checked
                  ? formData.permanentAddress.country?.toString()
                  : formData.temporaryAddress.country?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'country')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
            <TextInput
              label="pincode"
              value={
                checked
                  ? formData.permanentAddress.pincode?.toString()
                  : formData.temporaryAddress.pincode?.toString()
              }
              onChangeText={value =>
                handleInputChange('temporaryAddress', value, 'pincode')
              }
              mode="outlined"
              readOnly={checked ? true : false}
              style={screenStyles.inputContainer}
            />
          </> */}
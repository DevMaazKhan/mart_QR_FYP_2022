import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  AvoidKeyboardLayout,
  Button,
  Container,
  Input,
} from "../../../../components";
import { COLORS } from "../../../../constants/Theme";
import { Entypo } from "@expo/vector-icons";

export function MartProfileSettingsDashboard() {
  return (
    <AvoidKeyboardLayout>
      <Container>
        <View style={styles.root}>
          <Text style={styles.heading}>Mart Settings</Text>
          <View style={styles.form}>
            <View style={styles.avatar}>
              <View style={styles.avatarInner}>
                <Image
                  style={styles.avatarImg}
                  source={{
                    uri: "https://images.unsplash.com/photo-1638913662584-731da41f5a59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  }}
                />

                <TouchableOpacity
                  style={styles.changeImageIcon}
                  activeOpacity={0.8}
                >
                  <Entypo name="camera" size={18} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginVertical: 20 }} />

            <Input label="Mart Name" />
            <Input label="Mart Address" />
            <Input label="Email" />
            <Input label="Mart Cell #" />

            <View style={styles.buttons}>
              <Button title="Save" primary />
            </View>
          </View>
        </View>
      </Container>
    </AvoidKeyboardLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
  },

  heading: {
    fontFamily: "BOLD",
    fontSize: 30,
  },

  form: {
    marginTop: 50,
  },

  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 115,
    height: 115,
    borderWidth: 4,
    borderColor: COLORS.PRIMARY,
    borderRadius: 1000,
    // backgroundColor: COLORS.PRIMARY,
  },

  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 1000,
  },

  changeImageIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: COLORS.PRIMARY,
    width: 35,
    height: 35,
    borderRadius: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

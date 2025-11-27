import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  media: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },

  progressContainer: {
    position: 'absolute',
    top: 40,
    width: width,
    flexDirection: 'row',
    paddingHorizontal: 10,
    zIndex: 20,
    gap: 5,
  },

  progressBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: 3,
    backgroundColor: '#fff',
  },

  leftTap: {
    position: 'absolute',
    left: 0,
    height: height,
    width: width * 0.35,
    zIndex: 30,
  },

  rightTap: {
    position: 'absolute',
    right: 0,
    height: height,
    width: width * 0.35,
    zIndex: 30,
  },
  header: {
  position: 'absolute',
  top: 50,
  left: 10,
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 999,
},

profileImg: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 10,
},

username: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

});

import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import slides from "../assets/data/slides";
import BrujulaLogo from "../assets/brujula-logo.png";
const { width } = Dimensions.get("window");

export default function OnboardingScreen2({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentSlide + 1 });
    } else {
      navigation.replace("Login");
    }
  };

  function Dot({ active }) {
    return <View style={[styles.dot, active && styles.activeDot]} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width
          );
          setCurrentSlide(slideIndex);
        }}
        renderItem={({ item }) => (
          <ImageBackground source={item.background} style={styles.background}>
            <View style={styles.header}>
              <Image
                source={BrujulaLogo}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>Wanderlust</Text>
            </View>
            <View style={styles.bottomSection}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <View style={styles.bottomSectionFixed}>
              <View style={styles.dots}>
                {slides.map((_, index) => (
                  <Dot key={index} active={index === currentSlide} />
                ))}
              </View>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>{"\u2192"}</Text>
              </TouchableOpacity>
            </View>
            </View>
         
          </ImageBackground>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    width: width,
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  appName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "#F0F0F0",
    lineHeight: 22,
    marginBottom: 32,
    textAlign: "left",
  },
  dots: {
    flexDirection: "row",
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B0B0B0",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
    width: 16,
  },
  nextButton: {
    backgroundColor: "#FF6B4A",
    padding: 16,
    borderRadius: 32,
    width: 62,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
    lineHeight: 28,
  },
});

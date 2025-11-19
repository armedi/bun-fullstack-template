import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { apiClient } from "@/lib/apiClient";

export default function TabTwoScreen() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["hello"],
		queryFn: async () => {
			const result = await apiClient.api.hello.get();
			return result?.data;
		},
	});

	let message = "";
	if (isLoading) {
		message = "Loading...";
	} else if (isError) {
		message = "Failed to fetch hello";
	} else {
		message = data?.message ?? "No message returned";
	}

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
					style={styles.headerImage}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText
					type="title"
					style={{
						fontFamily: Fonts.rounded,
					}}
				>
					Hello
				</ThemedText>
			</ThemedView>
			<ThemedText>{message}</ThemedText>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});

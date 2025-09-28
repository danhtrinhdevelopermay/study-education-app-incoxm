
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { colors, commonStyles } from "@/styles/commonStyles";

const ICON_COLOR = "#007AFF";

export default function HomeScreen() {
  const studyAreas = [
    {
      title: "Mathematics",
      description: "Algebra, Geometry, Calculus",
      emoji: "📐",
      route: "/subjects/mathematics",
      color: "#007AFF",
      progress: 75,
    },
    {
      title: "Science",
      description: "Physics, Chemistry, Biology",
      emoji: "🔬",
      route: "/subjects/science",
      color: "#34C759",
      progress: 60,
    },
    {
      title: "Languages",
      description: "English, Literature, Writing",
      emoji: "📚",
      route: "/subjects/languages",
      color: "#FF9500",
      progress: 85,
    },
    {
      title: "History",
      description: "World History, Geography",
      emoji: "🏛️",
      route: "/subjects/history",
      color: "#AF52DE",
      progress: 45,
    },
    {
      title: "Computer Science",
      description: "Programming, Algorithms",
      emoji: "💻",
      route: "/subjects/computer-science",
      color: "#FF3B30",
      progress: 90,
    },
    {
      title: "Art & Music",
      description: "Creative Arts, Music Theory",
      emoji: "🎨",
      route: "/subjects/arts",
      color: "#FF2D92",
      progress: 30,
    }
  ];

  const renderStudyArea = (item: typeof studyAreas[0], index: number) => (
    <Pressable
      key={item.route}
      style={[styles.studyCard, { borderLeftColor: item.color }]}
      onPress={() => router.push(item.route as any)}
    >
      <View style={styles.cardHeader}>
        <IconCircle
          emoji={item.emoji}
          backgroundColor={item.color + "20"}
          size={50}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{item.progress}%</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${item.progress}%`,
                  backgroundColor: item.color 
                }
              ]} 
            />
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push("/profile")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="person.circle" color={ICON_COLOR} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.push("/settings")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="gear" color={ICON_COLOR} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Study Hub",
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome back!</Text>
            <Text style={styles.welcomeSubtitle}>
              Continue your learning journey
            </Text>
          </View>

          <View style={styles.quickStatsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>67%</Text>
              <Text style={styles.statLabel}>Average</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Study Areas</Text>
          </View>

          <View style={styles.studyAreasContainer}>
            {studyAreas.map((item, index) => renderStudyArea(item, index))}
          </View>

          <View style={styles.actionButtonsContainer}>
            <Button
              variant="primary"
              onPress={() => router.push("/quiz")}
              style={styles.actionButton}
            >
              Take Quiz
            </Button>
            <Button
              variant="outline"
              onPress={() => router.push("/flashcards")}
              style={styles.actionButton}
            >
              Flashcards
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  welcomeSection: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  quickStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  studyAreasContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  studyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  progressBar: {
    width: 50,
    height: 4,
    backgroundColor: '#e5e5e5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  headerButtonContainer: {
    padding: 6,
  },
});

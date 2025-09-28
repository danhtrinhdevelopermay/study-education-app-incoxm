
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";

export default function ComputerScienceScreen() {
  const topics = [
    {
      title: "Programming Basics",
      description: "Variables, loops, functions, and logic",
      progress: 95,
      lessons: 16,
      completed: 15,
      difficulty: "Beginner",
      emoji: "💻",
    },
    {
      title: "Data Structures",
      description: "Arrays, lists, trees, and graphs",
      progress: 85,
      lessons: 12,
      completed: 10,
      difficulty: "Intermediate",
      emoji: "🗂️",
    },
    {
      title: "Algorithms",
      description: "Sorting, searching, and optimization",
      progress: 90,
      lessons: 14,
      completed: 13,
      difficulty: "Advanced",
      emoji: "⚡",
    },
    {
      title: "Web Development",
      description: "HTML, CSS, JavaScript, and frameworks",
      progress: 80,
      lessons: 18,
      completed: 14,
      difficulty: "Intermediate",
      emoji: "🌐",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#34C759';
      case 'Intermediate': return '#FF9500';
      case 'Advanced': return '#FF3B30';
      default: return '#007AFF';
    }
  };

  const renderTopic = (topic: typeof topics[0], index: number) => (
    <Pressable
      key={index}
      style={styles.topicCard}
      onPress={() => router.push(`/lessons/${topic.title.toLowerCase().replace(' ', '-')}`)}
    >
      <View style={styles.topicHeader}>
        <IconCircle
          emoji={topic.emoji}
          backgroundColor="#FF3B30"
          size={50}
        />
        <View style={styles.topicInfo}>
          <Text style={styles.topicTitle}>{topic.title}</Text>
          <Text style={styles.topicDescription}>{topic.description}</Text>
          <View style={styles.topicMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(topic.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(topic.difficulty) }]}>
                {topic.difficulty}
              </Text>
            </View>
            <Text style={styles.lessonCount}>{topic.completed}/{topic.lessons} lessons</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${topic.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{topic.progress}%</Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Computer Science",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" color="#007AFF" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => console.log('CS quiz')} style={styles.headerButton}>
              <IconSymbol name="questionmark.circle" color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconCircle
            emoji="💻"
            backgroundColor="#FF3B30"
            size={80}
          />
          <Text style={styles.subjectTitle}>Computer Science</Text>
          <Text style={styles.subjectDescription}>
            Learn programming, algorithms, data structures, and web development
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>87%</Text>
              <Text style={styles.statLabel}>Overall Progress</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>52</Text>
              <Text style={styles.statLabel}>Lessons Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>22.1h</Text>
              <Text style={styles.statLabel}>Time Studied</Text>
            </View>
          </View>
        </View>

        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Topics</Text>
          {topics.map((topic, index) => renderTopic(topic, index))}
        </View>

        <View style={styles.actionSection}>
          <Button
            variant="primary"
            onPress={() => router.push('/quiz/computer-science')}
            style={styles.actionButton}
          >
            Take CS Quiz
          </Button>
          <Button
            variant="outline"
            onPress={() => router.push('/practice/computer-science')}
            style={styles.actionButton}
          >
            Code Practice
          </Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    padding: 6,
  },
  headerButton: {
    padding: 6,
  },
  header: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  subjectTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  subjectDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  topicsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topicHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  topicInfo: {
    flex: 1,
    marginLeft: 16,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  lessonCount: {
    fontSize: 12,
    color: '#666',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e5e5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF3B30',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
    minWidth: 40,
    textAlign: 'right',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
});

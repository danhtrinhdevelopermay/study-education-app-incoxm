
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";

export default function LanguagesScreen() {
  const topics = [
    {
      title: "Grammar",
      description: "Parts of speech, sentence structure",
      progress: 95,
      lessons: 14,
      completed: 13,
      difficulty: "Intermediate",
      emoji: "📝",
    },
    {
      title: "Literature",
      description: "Classic and modern literary works",
      progress: 80,
      lessons: 16,
      completed: 13,
      difficulty: "Advanced",
      emoji: "📖",
    },
    {
      title: "Writing",
      description: "Essays, creative writing, composition",
      progress: 70,
      lessons: 12,
      completed: 8,
      difficulty: "Intermediate",
      emoji: "✍️",
    },
    {
      title: "Vocabulary",
      description: "Word meanings, etymology, usage",
      progress: 85,
      lessons: 20,
      completed: 17,
      difficulty: "Beginner",
      emoji: "📚",
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
          backgroundColor="#FF9500"
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
          title: "Languages",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" color="#007AFF" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => console.log('Languages quiz')} style={styles.headerButton}>
              <IconSymbol name="questionmark.circle" color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconCircle
            emoji="📚"
            backgroundColor="#FF9500"
            size={80}
          />
          <Text style={styles.subjectTitle}>Languages</Text>
          <Text style={styles.subjectDescription}>
            Master English language skills through grammar, literature, writing, and vocabulary
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>82%</Text>
              <Text style={styles.statLabel}>Overall Progress</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>51</Text>
              <Text style={styles.statLabel}>Lessons Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15.7h</Text>
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
            onPress={() => router.push('/quiz/languages')}
            style={styles.actionButton}
          >
            Take Language Quiz
          </Button>
          <Button
            variant="outline"
            onPress={() => router.push('/practice/languages')}
            style={styles.actionButton}
          >
            Writing Practice
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
    color: '#FF9500',
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
    backgroundColor: '#FF9500',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9500',
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

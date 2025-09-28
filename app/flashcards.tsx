
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Animated } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";

export default function FlashcardsScreen() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyStarted, setStudyStarted] = useState(false);

  const flashcardDecks = [
    {
      name: "Math Formulas",
      emoji: "📐",
      color: "#007AFF",
      cards: 25,
      subject: "Mathematics",
      description: "Essential formulas for algebra and geometry"
    },
    {
      name: "Science Facts",
      emoji: "🔬",
      color: "#34C759",
      cards: 30,
      subject: "Science",
      description: "Key concepts in physics, chemistry, and biology"
    },
    {
      name: "Vocabulary",
      emoji: "📚",
      color: "#FF9500",
      cards: 50,
      subject: "Languages",
      description: "Advanced English vocabulary words"
    },
    {
      name: "Historical Dates",
      emoji: "🏛️",
      color: "#AF52DE",
      cards: 20,
      subject: "History",
      description: "Important dates and events in world history"
    },
  ];

  const sampleCards = [
    {
      front: "What is the Pythagorean theorem?",
      back: "a² + b² = c²\n\nIn a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides."
    },
    {
      front: "Define photosynthesis",
      back: "The process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.\n\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂"
    },
    {
      front: "What does 'ubiquitous' mean?",
      back: "Present, appearing, or found everywhere.\n\nExample: Smartphones have become ubiquitous in modern society."
    },
  ];

  const startStudying = (deckName: string) => {
    setSelectedDeck(deckName);
    setStudyStarted(true);
    setCurrentCard(0);
    setIsFlipped(false);
    console.log(`Starting ${deckName} flashcards`);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCard < sampleCards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      // End of deck
      setStudyStarted(false);
      setSelectedDeck(null);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const resetDeck = () => {
    setStudyStarted(false);
    setSelectedDeck(null);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  if (studyStarted && selectedDeck) {
    const card = sampleCards[currentCard];
    const progress = ((currentCard + 1) / sampleCards.length) * 100;

    return (
      <>
        <Stack.Screen
          options={{
            title: selectedDeck,
            headerLeft: () => (
              <Pressable onPress={resetDeck} style={styles.backButton}>
                <IconSymbol name="xmark" color="#007AFF" />
              </Pressable>
            ),
          }}
        />
        <View style={styles.container}>
          <View style={styles.studyHeader}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {currentCard + 1} of {sampleCards.length}
              </Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Pressable
              style={[styles.flashcard, isFlipped && styles.flippedCard]}
              onPress={flipCard}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>
                  {isFlipped ? card.back : card.front}
                </Text>
                {!isFlipped && (
                  <View style={styles.tapHint}>
                    <IconSymbol name="hand.tap" color="#999" size={20} />
                    <Text style={styles.tapHintText}>Tap to reveal answer</Text>
                  </View>
                )}
              </View>
            </Pressable>
          </View>

          <View style={styles.controlsContainer}>
            <View style={styles.navigationButtons}>
              <Button
                variant="outline"
                onPress={previousCard}
                disabled={currentCard === 0}
                style={styles.navButton}
              >
                <IconSymbol name="chevron.left" color="#007AFF" size={20} />
              </Button>
              
              <View style={styles.cardCounter}>
                <Text style={styles.counterText}>
                  {currentCard + 1} / {sampleCards.length}
                </Text>
              </View>
              
              <Button
                variant="outline"
                onPress={nextCard}
                style={styles.navButton}
              >
                {currentCard === sampleCards.length - 1 ? (
                  <IconSymbol name="checkmark" color="#34C759" size={20} />
                ) : (
                  <IconSymbol name="chevron.right" color="#007AFF" size={20} />
                )}
              </Button>
            </View>

            {isFlipped && (
              <View style={styles.difficultyButtons}>
                <Button
                  variant="outline"
                  onPress={nextCard}
                  style={[styles.difficultyButton, { borderColor: '#FF3B30' }]}
                  textStyle={{ color: '#FF3B30' }}
                >
                  Hard
                </Button>
                <Button
                  variant="outline"
                  onPress={nextCard}
                  style={[styles.difficultyButton, { borderColor: '#FF9500' }]}
                  textStyle={{ color: '#FF9500' }}
                >
                  Medium
                </Button>
                <Button
                  variant="outline"
                  onPress={nextCard}
                  style={[styles.difficultyButton, { borderColor: '#34C759' }]}
                  textStyle={{ color: '#34C759' }}
                >
                  Easy
                </Button>
              </View>
            )}
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Flashcards",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconCircle
            emoji="🃏"
            backgroundColor="#007AFF20"
            size={80}
          />
          <Text style={styles.title}>Flashcards</Text>
          <Text style={styles.subtitle}>
            Study with interactive flashcards to reinforce your learning
          </Text>
        </View>

        <View style={styles.decksContainer}>
          <Text style={styles.sectionTitle}>Study Decks</Text>
          {flashcardDecks.map((deck, index) => (
            <Pressable
              key={index}
              style={[styles.deckCard, { borderLeftColor: deck.color }]}
              onPress={() => startStudying(deck.name)}
            >
              <IconCircle
                emoji={deck.emoji}
                backgroundColor={deck.color + "20"}
                size={50}
              />
              <View style={styles.deckInfo}>
                <Text style={styles.deckName}>{deck.name}</Text>
                <Text style={styles.deckSubject}>{deck.subject}</Text>
                <Text style={styles.deckDescription}>{deck.description}</Text>
              </View>
              <View style={styles.deckMeta}>
                <Text style={styles.cardCount}>{deck.cards} cards</Text>
                <IconSymbol name="chevron.right" color="#ccc" size={20} />
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Study Features</Text>
          <View style={styles.featureItem}>
            <IconSymbol name="repeat" color="#007AFF" size={24} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Spaced Repetition</Text>
              <Text style={styles.featureDescription}>
                Cards you find difficult will appear more frequently
              </Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="chart.bar" color="#34C759" size={24} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Progress Tracking</Text>
              <Text style={styles.featureDescription}>
                Monitor your learning progress across all decks
              </Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <IconSymbol name="shuffle" color="#FF9500" size={24} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Shuffle Mode</Text>
              <Text style={styles.featureDescription}>
                Study cards in random order for better retention
              </Text>
            </View>
          </View>
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
  header: {
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  decksContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  deckCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  deckInfo: {
    flex: 1,
    marginLeft: 16,
  },
  deckName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  deckSubject: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  deckDescription: {
    fontSize: 14,
    color: '#666',
  },
  deckMeta: {
    alignItems: 'flex-end',
  },
  cardCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  featuresContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  // Study mode styles
  studyHeader: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  flashcard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  flippedCard: {
    backgroundColor: '#007AFF05',
    borderWidth: 2,
    borderColor: '#007AFF20',
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  cardText: {
    fontSize: 20,
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  tapHintText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  controlsContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCounter: {
    paddingHorizontal: 20,
  },
  counterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  difficultyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyButton: {
    flex: 1,
  },
});

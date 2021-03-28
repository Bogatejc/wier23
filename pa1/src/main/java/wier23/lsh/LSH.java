package wier23.lsh;

import java.util.*;

/**
 * This is an implementation of Locality-sensitive hashing using MinHash method.
 * First we need to create a new instance of LSH object and give two sets of string tokens.
 * Then we call our compute() method and wait for the result. :)
 */
public class LSH {
    private Set<String> set1;
    private Set<String> set2;
    private int hashSize;
    private int minHashValues[][];
    private int hash[];
    private Map<String, boolean[]> bitArray;

    public LSH(Set<String> set1, Set<String> set2) {
        this.set1 = set1;
        this.set2 = set2;
        this.bitArray = new HashMap<>();
        this.hashSize = set1.size() + set2.size();
        this.minHashValues = new int[2][hashSize];
    }

    /**
     * This is the main method that prepares and computes hash values.
     */
    public void compute() {
        for(int i = 0; i < 2; i++) {
            for(int j = 0; j < hashSize; j++) {
                minHashValues[i][j] = Integer.MAX_VALUE;
            }
        }

        hash = new int[hashSize];
        Random random = new Random(42);
        for(int i = 0; i < hashSize; i++){
            int a = random.nextInt();
            int b = random.nextInt();
            int c = random.nextInt();
            hash[i] = computeHash(a, b, c);
        }

        buildBitmaps();
        computeSimilarity();
    }

    /**
     * This is a simple method that returns a random hash.
     * @param a
     * @param b
     * @param c
     * @return computed hash value
     */
    private int computeHash(int a, int b, int c) {
        int prod = a * b * c;
        int hashValue = ((a * (prod >> 4) + b * prod + c) & 131071) + 5;
        return Math.abs(hashValue);
    }

    /**
     * Here we build our bitmap. For each token in both sets we check weather the token already exists
     * in the bitmap and add appropriate boolean value to it.
     */
    private void buildBitmaps() {
        for(String token : set1) {
            bitArray.put(token, new boolean[] {true, false});
        }

        for(String token : set2) {
            if(bitArray.containsKey(token)) {
                bitArray.put(token, new boolean[] {true, true});
            } else {
                bitArray.put(token, new boolean[] {false, true});
            }
        }
    }

    /**
     * This is a helper method, that prepares two sets of integers and then returns the Jaccard distance between them.
     * It also outputs weather the input strings are duplicates or not.
     */
    private void computeSimilarity() {
        computeMinHashSignature();

        Set<Integer> set1MinHashValues = new HashSet<>();
        Set<Integer> set2MinHashValues = new HashSet<>();
        for(int i = 0; i < minHashValues[0].length; i++) {
            set1MinHashValues.add(minHashValues[0][i]);
        }
        for(int i = 0; i < minHashValues[1].length; i++) {
            set2MinHashValues.add(minHashValues[1][i]);
        }
        double jaccDist = jaccardDistance(set1MinHashValues, set2MinHashValues);
        System.out.println("Computed jaccard distance is: " + jaccDist);
    }

    /**
     * Method to calculate Jaccard distance, which measures dissimilarity between sample sets.
     * @param a
     * @param b
     * @return jaccard distance
     */
    private double jaccardDistance(Set<Integer> a, Set<Integer> b) {
        Set<Integer> union = new HashSet<>(a);
        union.addAll(b);
        Set<Integer> intersection = new HashSet<>(a);
        intersection.retainAll(b);
        return (double)(union.size() - intersection.size())/union.size();
    }

    /**
     * This method computes minimum hash signature for all possible tokens
     */
    private void computeMinHashSignature() {
        int idx = 0;
        for(String token : bitArray.keySet()) {
            for(int i = 0; i < hashSize; i++) {
                if(set1.contains(token)) {
                    if(hash[idx] < minHashValues[0][idx]) {
                        minHashValues[0][idx] = hash[idx];
                    }
                }

                if(set2.contains(token)) {
                    if(hash[idx] < minHashValues[1][idx]) {
                        minHashValues[1][idx] = hash[idx];
                    }
                }
            }
            idx++;
        }
    }
}

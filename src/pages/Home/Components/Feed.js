import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

const Carousel = ({ items }) => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
    );

    const handleSavePost = async (postId) => [
        const userId = auth.currentUser .uid;
        const userRef = doc(db, 'users'", userId);
        const postRef = doc(db, 'posts'", postId);
        
        try L
        const postSnapshot = await getDoc(postRef);
        const userSnapshot = await getDoc(userRef);
        
        
        )
        
        
        if (postSnapshot.exists() && userSnapshot.exists()) [
        const postData = postSnapshot.data();
        
        const userData = userSnapshot.data();
        
        
        
        const postSavedBy = Array.isArray(postData.savedBy) ? postData.savedBy : [];
        ás const userSavedPosts = Array. isArray(userData.savedPosts) ? userData.savedPosts : [];
        
        
        if (postSavedBy.includes(userId))
    
        await updateDoc(postRef, (
        
        savedBy: arrayRemove(userId),
        
    
        
        await updateDoc(userRef, (
        
        savedPosts: arrayRemove(postId),
        
    
        
        else [
        
        await updateDoc(postRef, (
        
        savedBy: arrayUnion(userId),
        
    
         await updateDoc(userRef, (
        
        savedPosts: arrayUnion(postId),
        

        
         fetchPosts();
        
        ) catch (error) [
        
        console.error('Erro ao salvar o post:', error);
        ]
    ]
]
    ]

        
        
        
        

    return (
        <View>
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
        />
<Text styLe=(styles.postContent)> ( «content) </Text> 
<Text styLe=(styles.postTimestamp)> f «timestamp?.toDate().tolLocaleString()) </Text> 
<View styLe=(styles.postActions)> <TouchabLeOpacity styLe=(styles.icones) onPress=(() => setSelectedPostId(selectedPostId ===
 <Ionicons name="chatbubble-outline” size=(24) color="black” /> </TouchabLeOpacity> <TouchabLeOpacity styLe=(styles.icones) onPress=(() => handleLike( «id))> <FontAwesome name=( «likes. includes(user.uid) ? "heart' : “heart-o') size=(24) color="red" /> <Text styLe=(styles.likeCount)>( «likes.length)</Text> </TouchabLeOpacity> <TouchabLeOpacity styLe=(styles.icones) onPress=(() => handleSavePost( «id))> <Ionicons name=(postSavedBy.includes(user.uid) ? "bookmark" : 'bookmark-outline') size=(24) color="black” /> </TouchabLeOpacity> </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 5,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    flatListContent: {
        alignItems: 'center',
    },
});

export default Carousel;

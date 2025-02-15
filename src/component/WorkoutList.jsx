import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import dayjs from 'dayjs';

const WorkoutList = ({ workOutData, selectedFilter = [], startDate, endDate }) => {
    const [visibleItemCount, setVisibleItemCount] = useState(3);
    const [data, setData] = useState(workOutData);
    const opacity = useState(new Animated.Value(0))[0];

    useEffect(() => {
        // Use filterData only when there's a change in data or filters
        setData(filterData(workOutData, selectedFilter, startDate, endDate));
    }, [workOutData, selectedFilter, startDate, endDate]);

    const filterData = (data, selectedFilter, startDate, endDate) => {
        console.log("Selected Filter:", selectedFilter);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);

        return data.filter((item) => {
            // Parse date into 'YYYY-MM-DD' format for comparison
            const itemDate = dayjs(item.date, 'D MMM, ddd, YYYY'); 
            console.log("Item Date:", itemDate.format('YYYY-MM-DD'));

            const isWithinDateRange =
                (!startDate || !endDate || (itemDate.isSameOrAfter(dayjs(startDate)) && itemDate.isSameOrBefore(dayjs(endDate))));
            console.log("Within Date Range:", isWithinDateRange);

            const isMatchingWorkout = selectedFilter.length === 0 || item.details.some(detail => selectedFilter.includes(detail.workout));
            console.log("Matches Filter:", isMatchingWorkout);

            return isWithinDateRange && isMatchingWorkout;
        });
    };

    const formatDetails = (details) => {
        return details
            .filter((item) => selectedFilter.length === 0 || selectedFilter.includes(item.workout))
            .map((item) => ({
                title: item.workout,
                description: item.description,
            }));
    };

    const renderWorkoutItem = ({ item }) => {
        const filteredDetails = formatDetails(item.details);

        return (
            <View style={[styles.workoutItem]}>
                <Text style={[styles.textColor, styles.heading]}>
                    {dayjs(item.date, 'D MMM, ddd, YYYY').format('D MMM, ddd, YYYY')}
                </Text>
                <Text style={[styles.textColor, styles.subHeading]}>
                    {item.summary.join(' / ')}
                </Text>
                <Timeline
                    data={filteredDetails}
                    lineColor="#2E0461"
                    circleSize={10}
                    circleStyle={styles.circle}
                    titleStyle={styles.titleStyle}
                    descriptionStyle={styles.descriptionStyle}
                    circleColor="#F900B4"
                    timeContainerStyle={{ display: 'none' }}
                />
            </View>
        );
    };

    const handleViewMore = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setVisibleItemCount((prevCount) => prevCount + 3);
    };

    const renderFooter = () => {
        if (visibleItemCount >= data.length) return null;

        return (
            <TouchableOpacity style={styles.viewMoreContainer} onPress={handleViewMore}>
                <Text style={styles.viewMoreButton}>View More</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <View style={styles.workoutList}>
                {data.length > 0 ? (
                    <FlatList
                        data={data.slice(0, visibleItemCount)}
                        renderItem={renderWorkoutItem}
                        keyExtractor={(item, index) => `workout-${item.date}-${index}`}
                        contentContainerStyle={styles.flatListContent}
                        ListFooterComponent={renderFooter}
                    />
                ) : (
                    <Text style={styles.emptyState}>No workout data available.</Text>
                )}
            </View>
        </View>
    );
};

export default WorkoutList;

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    subHeading: {
        fontSize: 14,
        color: '#ccc',
        marginVertical: 10,
    },
    textColor: {
        color: '#fff',
    },
    titleStyle: {
        position: 'relative',
        top: -15,
        color: '#F906AC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    descriptionStyle: {
        position: 'relative',
        top: -15,
        color: '#ccc',
        fontSize: 14,
        marginTop: 5,
    },
    emptyState: {
        color: '#ccc',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    workoutList: {
        paddingBottom: 150,
        marginTop: 10,
    },
    flatListContent: {
        flexGrow: 1,
    },
    viewMoreContainer: {
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#F900B4',
        borderRadius: 5,
    },
    viewMoreButton: {
        color: '#fff',
        fontSize: 16,
        padding: 10,
        textAlign: 'center',
    },
});

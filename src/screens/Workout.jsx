import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import workoutData from '../assets/data/WorkoutData';
import WorkoutList from '../component/WorkoutList';

// Extend dayjs with the plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Workout = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState(workoutData.workouts);
  const filterAnim = useRef(new Animated.Value(300)).current;
  const datePickerAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    setFilteredWorkouts(filterWorkouts(workoutData.workouts));
  }, [startDate, endDate, selectedFilter]);

  const handleFilterToggle = (open) => {
    Animated.timing(filterAnim, {
      toValue: open ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleDatePickerToggle = () => {
    Animated.timing(datePickerAnim, {
      toValue: open ? 400 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const handleFilterSelect = (filter) => {
    if (!selectedFilter.includes(filter)) {
      setSelectedFilter((prev) => [...prev, filter]);
    }
  };

  const handleRemoveFilter = (filter) => {
    setSelectedFilter((prev) => prev.filter((item) => item !== filter));
  };

  const filterWorkouts = (workouts) => {
    let filtered = workouts;

    if (selectedFilter.length > 0) {
      filtered = filtered.filter((workout) =>
        workout.details.some((detail) => selectedFilter.includes(detail.workout))
      );
    }

    if (startDate || endDate) {
      filtered = filtered.filter((workout) => {
        const workoutDate = dayjs(workout.date, 'D MMM, ddd, YYYY').format('YYYY-MM-DD');
        const start = startDate ? dayjs(startDate).format('YYYY-MM-DD') : null;
        const end = endDate ? dayjs(endDate).format('YYYY-MM-DD') : null;

        return (!start || workoutDate >= start) && (!end || workoutDate <= end);
      });
    }

    return filtered;
  };

  const getUniqueFilters = (workouts) => {
    const filterSet = new Set();
    workouts.forEach((item) => {
      item.details.forEach((detail) => {
        filterSet.add(detail.workout);
      });
    });
    return Array.from(filterSet);
  };

  const uniqueFilters = getUniqueFilters(workoutData.workouts);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{workoutData.heading}</Text>
        <TouchableOpacity onPress={() => console.log('Close button pressed')}>
          <Icon name="close" size={36} color="#FA02B5" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtext}>{workoutData.subheading}</Text>

      <View style={styles.btns}>
        <TouchableOpacity onPress={handleDatePickerToggle}>
          <View style={styles.btn}>
            <Icon name="calendar" size={24} color="#000" />
            <Text style={[styles.subtext, { color: '#000', fontSize: 18 }]}>Select Date</Text>
          </View>
        </TouchableOpacity>

        <Animated.View style={[styles.datePickerContainer, { transform: [{ translateX: datePickerAnim }] }]}>
          <DateTimePicker
            mode="range"
            startDate={startDate}
            endDate={endDate}
            onChange={({ startDate, endDate }) => {
              handleDatePickerToggle();
              setStartDate(startDate);
              setEndDate(endDate);
            }}
          />
        </Animated.View>

        <TouchableOpacity onPress={() => handleFilterToggle(true)}>
          <View style={[styles.btn, { width: 100 }]}>
            <Icon name="filter-variant" size={24} color="#000" />
            <Text style={[styles.subtext, { color: '#000', fontSize: 18 }]}>Filters</Text>
          </View>
        </TouchableOpacity>
      </View>

      {selectedFilter.length > 0 && (
        <View style={styles.selectedFilters}>
          {selectedFilter.map((filter, index) => (
            <View key={index} style={styles.selectedFilterItem}>
              <Text style={styles.subtext}>{filter}</Text>
              <TouchableOpacity onPress={() => handleRemoveFilter(filter)}>
                <Icon name="close" size={24} color="#FA02B5" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <WorkoutList
        workOutData={filteredWorkouts}
        selectedFilter={selectedFilter}
        startDate={startDate ? dayjs(startDate).format('YYYY-MM-DD') : null}
        endDate={endDate ? dayjs(endDate).format('YYYY-MM-DD') : null}
      />

      <Animated.View style={[styles.filterContainer, { transform: [{ translateY: filterAnim }] }]}>
        <TouchableOpacity onPress={() => handleFilterToggle(false)} style={styles.closeFilter}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>

        <ScrollView style={styles.scrollView}>
          {uniqueFilters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleFilterSelect(filter)}
              style={styles.radioButtonContainer}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedFilter.includes(filter) && styles.radioButtonSelected,
                ]}
              />
              <Text style={[styles.subtext, { fontSize: 20 }]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#140027',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#fff',
    fontSize: 16,
  },
  btns: {
    marginTop: 10,
    flexDirection: 'row',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FA02B5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  datePickerContainer: {
    position: 'absolute',
    left: -400,
    top: 50,
    width: 350,
    backgroundColor: '#fff',
    zIndex: 10,
    padding: 20,
    borderRadius: 10,
  },
  filterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FA02B5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 300,
  },
  scrollView: {
    marginTop: 40,
  },
  closeFilter: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaa',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#fff',
  },
  selectedFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectedFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#4A029A',
    borderRadius: 15,
  },
  workoutItem: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  workoutDate: {
    color: '#FA02B5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutSummary: {
    color: '#fff',
    fontSize: 16,
  },
});

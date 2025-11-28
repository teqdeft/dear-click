import React from 'react';
import StoryViewer from './StoryViewer/StoryViewer';

export default function StoryScreen({ route, navigation }) {
  return (
    <StoryViewer
      userIndex={route.params.userIndex}
      users={route.params.users}
      onClose={() => navigation.goBack()}
    />
  );
}

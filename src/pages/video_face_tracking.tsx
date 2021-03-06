import { TinyFaceDetectorOptions } from 'face-api.js';
import * as React from 'react';

import { FaceAndLandmarkDetection, FaceAndLandmarkDetectionProps } from '../components/FaceAndLandmarkDetection';
import { TrackFaces } from '../components/TrackFaces';
import { VideoWithOverlay } from '../components/VideoWithOverlay';
import { EXAMPLE_VIDEO, FACE_DETECTORS } from '../const';
import { Root } from '../Root';

type PageState = FaceAndLandmarkDetectionProps

export default class extends React.Component<{}, PageState> {

  public render() {
    if (!(typeof window !== 'undefined' && window.document) ){
      return null
    }

    return(
      <Root>
        <VideoWithOverlay
          onLoaded={({ video: input, overlay }) => this.setState({ input, overlay })}
          maxVideoWidth={800}
          src={EXAMPLE_VIDEO}
        />
        <FaceAndLandmarkDetection
          {...this.state}
          initialFaceDetector={FACE_DETECTORS[0]}
          initialTinyFaceDetectorOptions={new TinyFaceDetectorOptions({ inputSize: 416 })}
        >
        {(detectionOptions, options) =>
          <TrackFaces
            detectionOptions={detectionOptions}
            options={options}
            {...this.state}
          />
        }
        </FaceAndLandmarkDetection>
      </Root>
    )
  }
}
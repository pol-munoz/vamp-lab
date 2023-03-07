import React, {memo, useEffect, useRef} from 'react'
import './WaveForm.css'
import WaveSurfer from "wavesurfer.js"

export default memo(function WaveForm(props) {

    const waveformRef = useRef()
    useEffect(() => {
        console.log('Effect waveform ' + props.track.name)
        if(waveformRef.current) {
            console.log('WaveSurfer waveform ' + props.track.name)
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
            })
            wavesurfer.load('vamp://' + props.track.path)
        }
    }, [])

    let classes = 'WaveForm'

    if (props.className) {
        classes += ` ${props.className}`
    }

    console.log('Render waveform ' + props.track.name)

    return (
        <div className={classes} ref={waveformRef}>
        </div>
    )
})
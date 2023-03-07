import React, {memo, useEffect, useRef, useState} from 'react'
import './WaveForm.css'
import WaveSurfer from "wavesurfer.js"

export default memo(function WaveForm(props) {

    const [loading, setLoading] = useState(true)
    const containerRef = useRef()
    const waveSurferRef = useRef()

    const sync = () => {
        if (waveSurferRef.current) {
            if (waveSurferRef.current.isPlaying() !== props.playing) {
                waveSurferRef.current.playPause()
            }
            if (waveSurferRef.current.auxSinkId !== props.track.device) {
                waveSurferRef.current.setSinkId(props.track.device)
                waveSurferRef.current.auxSinkId = props.track.device
            }
        }
    }
    useEffect(() => {
        console.log('Effect waveform ' + props.track.name)

        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            responsive: 50,
            cursorWidth: 0,
        })

        waveSurfer.load('vamp://' + props.track.path)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
            setLoading(false)
            sync()
        })

        return () =>  waveSurfer.destroy()
    }, [props.track.path])

    sync()

    let classes = 'WaveForm'

    if (props.className) {
        classes += ` ${props.className}`
    }

    console.log('Render waveform ' + props.track.name)

    return (
        <div className={classes} ref={containerRef}>
            {loading ? <p className="WaveForm-placeholder">Loading...</p> : null}
        </div>
    )
})
import React, {memo, useEffect, useRef, useState} from 'react'
import './WaveForm.css'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import Button from '../../../../../../components/Button/Button'
import Error from '../../../../../../../resources/icons/error.svg'
import {UPDATE_TRACK_IN_ACTIVE_SONG} from '../../../ActiveSongReducer'

export default memo(function WaveForm(props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const containerRef = useRef()
    const waveSurferRef = useRef()

    const onReselectClick = async () => {
        const track = await window.activeSong.promptUpdateTrack(props.track.id)
        props.dispatch({
            type: UPDATE_TRACK_IN_ACTIVE_SONG,
            payload: {track}
        })
        setError(false)
        setLoading(true)
    }

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            responsive: 50,
            cursorWidth: 0,
            interact: false,
            partialRender: true,
            plugins: [
                RegionsPlugin.create({
                    dragSelection: props.editable
                })
            ]
        })

        waveSurfer.load('vamp://' + props.track.path)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
            setLoading(false)
        })
        waveSurfer.on('error', () => {
            setLoading(false)
            setError(true)
        })

        return () => waveSurfer.destroy()
    }, [props.track.path])

    useEffect(() => {
        waveSurferRef.current?.drawer.fireEvent('redraw')
    }, [props.duration, loading])

    useEffect(() => {
        if (waveSurferRef.current && waveSurferRef.current.isPlaying() !== props.playing) {
            waveSurferRef.current.playPause()
        }
    }, [props.playing, loading])

    useEffect(() => {
        waveSurferRef.current?.setSinkId(props.track.device)
    }, [props.track.device, loading])

    useEffect(() => {
        if (waveSurferRef.current && waveSurferRef.current.getVolume() !== props.track.volume) {
            waveSurferRef.current.setVolume(props.track.volume)
            if (props.track.volume === 0.0 && !waveSurferRef.current.getMute()) {
                waveSurferRef.current.setMute(true)
            } else if (props.track.volume > 0.0 && waveSurferRef.current.getMute()) {
                waveSurferRef.current.setMute(false)
            }
        }
    }, [props.track.volume, loading])

    let classes = 'WaveForm'

    if (props.className) {
        classes += ` ${props.className}`
    }

    const widthPercentage = (props.track.duration / props.duration) * 100
    return (
        <div className={classes} style={{paddingRight: `${100 - widthPercentage}%`}} onClick={event => {
            const bounds = event.target.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width
            const y = (event.clientY - bounds.top) / bounds.height
            console.log(x, y)
        }}>
            <div ref={containerRef}>
            </div>
            {loading ? <p className="WaveForm-placeholder">Loading...</p> : null}
            {error ?
                <Button onClick={onReselectClick} className="WaveForm-error" transparent rounded destructive>
                    <div className="Vamp-row">
                        <Error/>
                        <p className="WaveForm-error-text">Couldn't find the track. Click to re-select it.</p>
                    </div>
                </Button>
                : null}
        </div>
    )
})
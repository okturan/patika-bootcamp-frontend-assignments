const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const sounds = {};

// Function to load audio files into the AudioContext
async function loadSound(name, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    sounds[name] = audioBuffer;
}

// Load all sounds asynchronously
Promise.all([
    loadSound('boom', 'sounds/boom.wav'),
    loadSound('clap', 'sounds/clap.wav'),
    loadSound('hihat', 'sounds/hihat.wav'),
    loadSound('kick', 'sounds/kick.wav'),
    loadSound('openhat', 'sounds/openhat.wav'),
    loadSound('ride', 'sounds/ride.wav'),
    loadSound('snare', 'sounds/snare.wav'),
    loadSound('tink', 'sounds/tink.wav'),
    loadSound('tom', 'sounds/tom.wav')
]).then(() => {
    console.log('All sounds are loaded and ready to play.');
});

// Function to play sound using AudioContext
function playSound(sound) {
    const audioBuffer = sounds[sound];
    if (audioBuffer) {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    }
}

// Function to handle button animation with specific styles
function animateButton(button, sound) {
    button.classList.add('active', sound); // Add both active and sound classes
    
    // Use a timeout to allow animations to show
    setTimeout(() => {
        button.classList.remove('active', sound); // Remove both active and sound classes
    }, 300);
}

// Select all drum buttons
const drums = document.querySelectorAll('.drum');

// Event listeners for mouse clicks
drums.forEach(button => {
    button.addEventListener('click', () => {
        const sound = button.getAttribute('data-sound');
        playSound(sound);
        animateButton(button, sound);
    });
});

// Event listener for keyboard presses
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    let sound;

    switch (key) {
        case 'a':
            sound = 'boom';
            break;
        case 's':
            sound = 'clap';
            break;
        case 'd':
            sound = 'hihat';
            break;
        case 'f':
            sound = 'kick';
            break;
        case 'g':
            sound = 'openhat';
            break;
        case 'h':
            sound = 'ride';
            break;
        case 'j':
            sound = 'snare';
            break;
        case 'k':
            sound = 'tink';
            break;
        case 'l':
            sound = 'tom';
            break;
        default:
            return; // Exit if the key is not mapped
    }

    const button = document.querySelector(`.drum[data-sound="${sound}"]`);
    if (button) {
        playSound(sound);
        animateButton(button, sound);
    }
});

export default {
    onwarn: (warning, _handler) => {
        if (warning.code.startsWith("a11y-")) return;
        _handler(warning);
    },
};

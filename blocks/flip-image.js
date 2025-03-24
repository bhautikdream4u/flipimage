(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var RichText = wp.blockEditor.RichText;
    var Button = wp.components.Button;
    var el = wp.element.createElement;

    registerBlockType('flip-image/block', {
        title: 'Flip Image',
        icon: 'images-alt2',
        category: 'design',
        attributes: {
            imageUrl: { type: 'string', default: '' },
            title: { type: 'string', default: 'Flip Title' },
            description: { type: 'string', default: 'Flip Description' },
        },
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el('div', { className: 'flip-card' },
                el('div', { className: 'flip-card-inner' },
                    el('div', { className: 'flip-card-front' },
                        el(MediaUpload, {
                            onSelect: function(media) { setAttributes({ imageUrl: media.url }); },
                            allowedTypes: ['image'],
                            render: function(obj) {
                                return el(Button, { onClick: obj.open, className: 'button button-primary' },
                                    attributes.imageUrl ? 'Change Image' : 'Upload Image'
                                );
                            }
                        }),
                        attributes.imageUrl ? el('img', { src: attributes.imageUrl, style: { width: '300px', height: '300px' } }) : null
                    ),
                    el('div', { className: 'flip-card-back' },
                        el(RichText, {
                            tagName: 'h1',
                            value: attributes.title,
                            onChange: function(value) { setAttributes({ title: value }); },
                            placeholder: 'Enter title'
                        }),
                        el(RichText, {
                            tagName: 'p',
                            value: attributes.description,
                            onChange: function(value) { setAttributes({ description: value }); },
                            placeholder: 'Enter description'
                        })
                    )
                )
            );
        },
        save: function(props) {
            var attributes = props.attributes;
            return el('div', { className: 'flip-card' },
                el('div', { className: 'flip-card-inner' },
                    el('div', { className: 'flip-card-front' },
                        el('img', { src: attributes.imageUrl, style: { width: '300px', height: '300px' } })
                    ),
                    el('div', { className: 'flip-card-back' },
                        el('h1', {}, attributes.title),
                        el('p', {}, attributes.description)
                    )
                )
            );
        },
    });
})(window.wp);

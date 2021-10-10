<?php /** @noinspection PhpUndefinedVariableInspection */

/***************************************************************
 * Extension Manager/Repository config file for ext: "yaml_browser"
 ***************************************************************/

$EM_CONF[$_EXTKEY] = [
    'title' => 'YAML Browser',
    'description' => 'Browse and debug YAML definitions in TYPO3 in a similar way to the "TypoScript Object Browser".',
    'category' => 'misc',
    'author' => 'Christian Eßl',
    'author_email' => 'indy.essl@gmail.com',
    'state' => 'beta',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '1.0.0',
    'constraints' => [
        'depends' => [
            'typo3' => '9.5.0-10.4.99',
            'form' => '*',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
